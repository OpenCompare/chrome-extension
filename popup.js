/**
 * Created by hvallee on 7/23/15.
 */
var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {

    $(document).ready(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, {
                "message": "get_find_button"
            }, function(response) {
                if(response) {
                    document.getElementById('checkPage').style.display = 'none';
                    document.getElementById('uncheckPage').style.display = 'block';
                }
            });
        });
        $( '#gotIt' ).click(function() {
            chrome.runtime.sendMessage({
                "message": "store_gotIt_button"
            });
            $( '#message' ).hide();
        });
    });

    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {

        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            document.getElementById('checkPage').style.display = 'none';
            document.getElementById('uncheckPage').style.display = 'block';
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "find_tables"});
            chrome.tabs.sendMessage(activeTab.id, {
                "message": "store_find_button"
            });
        });

    }, false);

    var uncheckPageButton = document.getElementById('uncheckPage');
    uncheckPageButton.addEventListener('click', function() {

        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            document.getElementById('checkPage').style.display = 'block';
            document.getElementById('uncheckPage').style.display = 'none';
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "remove_buttons"});
        });

    }, false);
}, false);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "displayHttpsInstructions") {
            $( '#message' ).show();
        }
        if (request.message === "hideHttpsInstructions") {
            $( '#message' ).hide();
        }

    }
);