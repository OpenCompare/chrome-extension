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


        var checkPageButton = document.getElementById('checkPage');
        checkPageButton.addEventListener('click', function() {
            document.getElementById('checkPage').style.display = 'none';
            document.getElementById('uncheckPage').style.display = 'block';

            // Send a message to the active tab
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": "find_tables"});
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

})();
