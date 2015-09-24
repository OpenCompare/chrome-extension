/**
 * Created by hvallee on 7/23/15.
 */

(function() {
    "use strict";

    var background = chrome.extension.getBackgroundPage();

    document.addEventListener('DOMContentLoaded', function() {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, {
                "message": "get_find_button"
            }, function(response) {

                console.log("get find button=" + response);

                if(response) {
                    document.getElementById('checkPage').style.display = 'none';
                    document.getElementById('uncheckPage').style.display = 'block';
                }
            });
        });


        document.querySelector('#gotIt').click(function() {
            chrome.runtime.sendMessage({
                "message": "store_gotIt_button"
            });
            //document.querySelector('#message').hide(); // TODO : convert hide to pure JS
        });

        var checkPageButton = document.getElementById('checkPage');
        checkPageButton.addEventListener('click', function() {
            document.getElementById('checkPage').style.display = 'none';
            document.getElementById('uncheckPage').style.display = 'block';

            // Send a message to the active tab
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": "find_tables"});
                //chrome.tabs.sendMessage(activeTab.id, {"message": "store_find_button"});
            });

        }, false);

        var uncheckPageButton = document.getElementById('uncheckPage');
        uncheckPageButton.addEventListener('click', function() {

            document.getElementById('checkPage').style.display = 'block';
            document.getElementById('uncheckPage').style.display = 'none';

            // Send a message to the active tab
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": "remove_buttons"});
            });

        }, false);
    }, false);

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.message === "displayHttpsInstructions") {
                //document.querySelector('#message').show(); // TODO : convert show to pure JS
            }
            if (request.message === "hideHttpsInstructions") {
                //document.querySelector('#message').hide(); // TODO : convert hide to pure JS
            }

        }
    );
})();
