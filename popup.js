/**
 * Created by hvallee on 7/23/15.
 */


// This block is new!
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "convert_to_editor" ) {

            var fd = new FormData();
            var blob = new Blob([request.table], {type: "text/html"});
            fd.append("file", blob);
            fd.append('title', 'Test');
            fd.append('productAsLines', true);
            var req = new XMLHttpRequest();
            req.open("POST", "http://localhost:9000/api/embedFromHtml");
            req.send(fd);

            req.onreadystatechange=function(){
                if (req.readyState==4 && req.status==200){
                    // Send a message to the active tab
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        var activeTab = tabs[0];
                        chrome.tabs.sendMessage(activeTab.id, {
                            "message": "replace_table",
                            "id": req.responseText
                        });
                    });
                }
            }
        }
    }
);

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {

        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "find_tables"});
        });

    }, false);
}, false);