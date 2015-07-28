/**
 * Created by hvallee on 7/23/15.
 */


chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        var id = 0;
        if( request.message === "find_tables" ) {

            var tables =$("table");

            for(var index = 0; index < tables.length; index++) {
                var table = tables[index];

                var button = document.createElement("button");
                button.setAttribute("id", index.toString());

                button.addEventListener('click', function(event) {
                    id = event.target.getAttribute("id");

                    chrome.runtime.sendMessage({
                        "message": "convert_to_editor",
                        "table": tables[id].outerHTML,
                        "index": id});
                });
                var buttonContent = document.createTextNode("Replace this table");
                button.appendChild(buttonContent);
                var parentDiv = tables[index].parentNode;
                parentDiv.insertBefore(button, tables[index]);
            }


        }

        if( request.message === "replace_table" ) {

            var editor = '<iframe src="http://localhost:9000/embedPCM/'+request.id+'?enableEdit=false&enableExport=false&enableTitle=false&enableShare=false" ' +
                'scrolling="no"  width="100%" height="600px" style="border:none;"></iframe>';

            $("table").eq(request.tableIndex).replaceWith(editor);

        }
    }
);

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('0');

    checkPageButton.addEventListener('click', function() {

        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "find_tables"});
        });

    }, false);
}, false);
