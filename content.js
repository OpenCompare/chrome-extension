/**
 * Created by hvallee on 7/23/15.
 */
var tables;
chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        var id = 0;

        if( request.message === "find_tables" ) {

            if (window.location.protocol == "https:") {
                chrome.runtime.sendMessage({
                    "message": "displayHttpsInstructions"
                });
                // We add an iFrame to display the shield icon
                var editor = '<iframe src="http://localhost:9000/embedPCM" height="0"></iframe>';

                $("body").append(editor);
            }

             tables =$("table");

            for(var index = 0; index < tables.length; index++) {
                var table = tables[index];
                console.log(table);

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
            }
            console.log(tables.length);
        }

        if( request.message === "remove_buttons" ) {
            var buttons =$("button[data-type='OpenCompareButton']");
            buttons.remove();
        }

            if( request.message === "replace_table" ) {
                var editor = '<iframe src="http://localhost:9000/embedPCM/' + request.id + '?enableEdit=false&enableExport=false&enableTitle=false&enableShare=false" ' +
                    'scrolling="no"  width="100%" height="600px" style="border:none;"></iframe>';

                tables.eq(request.tableIndex).replaceWith(editor);
        }
    }
);

