/**
 * Created by hvallee on 7/23/15.
 */

var tables;
var findingTables = false;


chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        var id = 0;

        if( request.message === "find_tables" ) {
            chrome.runtime.sendMessage({
                "message": "get_gotIt_button"
            }, function(response) {
                if (!response) {
                    if (window.location.protocol == "https:") {
                        chrome.runtime.sendMessage({
                            "message": "displayHttpsInstructions"
                        });
                        // We add an iFrame to display the shield icon
                        var editor = '<iframe src="http://localhost:9000/embedPCM/null" height="0"></iframe>';

                        $("body").append(editor);
                    }
                }
            });


            tables =$("table");

            for(var index = 0; index < tables.length; index++) {
                var table = tables[index];

                /* Replace table button */
                var button = document.createElement("button");
                button.setAttribute("class", "waves-effect waves-light btn");
                button.setAttribute("style", "margin-top: 10px");
                button.setAttribute("id", index.toString());
                button.setAttribute("data-type", 'OpenCompareButton');

                button.addEventListener('click', function(event) {

                    id = event.target.getAttribute("id");
                    $('#'+id).hide();

                    chrome.runtime.sendMessage({
                        "message": "convert_to_editor",
                        "table": tables[id].outerHTML,
                        "index": id
                    });
                });
                var buttonContent = document.createTextNode("Replace this table");
                button.appendChild(buttonContent);
                var parentDiv = tables[index].parentNode;
                parentDiv.insertBefore(button, tables[index]);

                /* Open in OpenCompare button */

                var button2 = document.createElement("button");

                button2.setAttribute("class", "waves-effect waves-light btn");
                button2.setAttribute("style", "margin-top: 10px");
                button2.setAttribute("id", index.toString());
                button2.setAttribute("data-type", 'OpenCompareButton');

                button2.addEventListener('click', function(event) {

                    id = event.target.getAttribute("id");

                    chrome.runtime.sendMessage({
                        "message": "open_in_opencompare",
                        "table": tables[id].outerHTML,
                        "index": id
                    });
                });
                var buttonOpen = document.createTextNode("Open in OpenCompare.org");
                button2.appendChild(buttonOpen);
                var parentDiv = tables[index].parentNode;
                parentDiv.insertBefore(button2, tables[index]);
            }
        }

        if( request.message === "remove_buttons" ) {
            var buttons =$("button[data-type='OpenCompareButton']");
            buttons.remove();
        }

        if( request.message === "replace_table" ) {
            var editor = '<iframe src="http://opencompare.org/embedPCM/' + request.id + '?enableEdit=false&enableExport=true&enableTitle=false&enableShare=true&deleteAfterLoaded=true" ' +
                'scrolling="auto"  width="'+tables.eq(request.tableIndex).width()+'" height="'+tables.eq(request.tableIndex).height()+'" style="border:none;"></iframe>';

            tables.eq(request.tableIndex).replaceWith(editor);
        }
        else if( request.message === "open_tab" ) {
            window.open('http://opencompare.org/pcm/' + request.id + '?deleteAfterLoaded=true', '_blank');
        }
        else if( request.message === "store_find_button" ) {
            findingTables = true;
        }
        else if( request.message === "get_find_button" ) {
            sendResponse(findingTables);
        }
    }
);

