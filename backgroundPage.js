/**
 * Created by hvallee on 7/28/15.
 */

var gotIt = false;

chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        if( request.message === "convert_to_editor" ) {
            sendResponse({called: "I got it !"});
            var fd = new FormData();
            var blob = new Blob([request.table], {type: "text/html"});
            fd.append("file", blob);
            fd.append('title', 'Test');
            fd.append('productAsLines', true);
            var req = new XMLHttpRequest();
            req.open("POST", "http://opencompare.org/api/embedFromHtml");
            req.send(fd);

            req.onreadystatechange=function(){
                if (req.readyState==4 && req.status==200){
                    // Send a message to the active tab
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        var activeTab = tabs[0];
                        chrome.tabs.sendMessage(activeTab.id, {
                            "message": "replace_table",
                            "id": req.responseText,
                            "tableIndex": request.index
                        });
                    });
                }
            }
        }
        else if( request.message === "store_gotIt_button" ) {
            gotIt = true
        }
        else if( request.message === "get_gotIt_button" ) {
            sendResponse(gotIt);
        }
    }
);