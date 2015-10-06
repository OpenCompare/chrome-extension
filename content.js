/**
 * Created by hvallee on 7/23/15.
 */

(function() {
    "use strict";

    var tables;
    var findingTables = false;
    var ocServer = "opencompare.org";
    //var ocServer = "localhost:9000";

    function createForm(table, appendToPage) {
        var form = document.createElement("form");
        form.method = "post";

        // Set values in form
        var inputTitle = document.createElement("input");
        inputTitle.type = "hidden";
        inputTitle.name = "title";
        inputTitle.value = document.title;

        var inputProductAsLines = document.createElement("input");
        inputProductAsLines.type = "hidden";
        inputProductAsLines.name = "productAsLines";
        inputProductAsLines.value = "true";

        var inputContent = document.createElement("input");
        inputContent.type = "hidden";
        inputContent.name = "content";
        inputContent.value = table.outerHTML;

        var inputSource = document.createElement("input");
        inputSource.type = "hidden";
        inputSource.name = "source";
        inputSource.value = document.URL;

        // Add form to page
        table.parentNode.appendChild(form);
        form.appendChild(inputTitle);
        form.appendChild(inputProductAsLines);
        form.appendChild(inputContent);
        form.appendChild(inputSource);

        return form;
    }

    function sendTable(id) {
        var table = tables[id];

        // Create form
        var form = createForm(table);
        form.target = "ocIframe";
        form.action = "https://" + ocServer + "/api/import/html?format='embed'";

        // Create iframe
        var ocIframe = document.createElement("iframe");
        ocIframe.name = "ocIframe";
        ocIframe.setAttribute("type", "content");
        ocIframe.scrolling = "auto";
        ocIframe.width = "100%";

        var originalheight = tables[id].offsetHeight;
        if(originalheight < 300) {
            ocIframe.height = "300px";
        } else {
            ocIframe.height = originalheight;
        }

        ocIframe.setAttribute("style", "border:none;");

        // Replace table by iframe
        var tableParent = table.parentNode;
        tableParent.replaceChild(ocIframe, table);

        form.submit();

        tableParent.removeChild(form);
    }

    function openTable(id) {
        var table = tables[id];
        var form = createForm(table);
        form.target = "_blank";
        form.action = "https://" + ocServer + "/api/import/html?format='page'";
        form.submit();
        table.parentNode.removeChild(form);
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

            if( request.message === "find_tables" ) {

                findingTables = true;

                //chrome.runtime.sendMessage({
                //    "message": "get_gotIt_button"
                //}, function(response) {
                //    if (!response) {
                //        if (window.location.protocol == "https:") {
                //            chrome.runtime.sendMessage({
                //                "message": "displayHttpsInstructions"
                //            });
                //            // We add an iFrame to display the shield icon
                //            var editor = '<iframe src="http://localhost:9000/embedPCM/null" height="0"></iframe>';
                //
                //            $("body").append(editor);
                //        }
                //    }
                //});


                tables = document.getElementsByTagName("table");

                for(var index = 0; index < tables.length; index++) {
                    var table = tables[index];

                    /* Replace table button */
                    var button = document.createElement("button");
                    button.class = "waves-effect waves-light btn";
                    button.setAttribute("style", "margin-top: 10px");
                    button.id = index.toString();
                    button.setAttribute("data-type", 'OpenCompareButton');

                    button.addEventListener('click', function(event) {

                        var id = event.target.getAttribute("id");
                        document.getElementById(id).style.display = 'none';
                        sendTable(event.target.getAttribute("id"));
                    });
                    var buttonContent = document.createTextNode("Replace this table");
                    button.appendChild(buttonContent);
                    var parentDiv = tables[index].parentNode;
                    parentDiv.insertBefore(button, tables[index]);

                    /* Open in OpenCompare button */

                    var button2 = document.createElement("button");

                    button2.class = "waves-effect waves-light btn";
                    button2.setAttribute("style", "margin-top: 10px");
                    button2.id = index.toString();
                    button2.setAttribute("data-type", 'OpenCompareButton');

                    button2.addEventListener('click', function(event) {

                        var id = event.target.getAttribute("id");
                        openTable(event.target.getAttribute("id"));
                    });
                    var buttonOpen = document.createTextNode("Open in OpenCompare.org");
                    button2.appendChild(buttonOpen);
                    var parentDiv = tables[index].parentNode;
                    parentDiv.insertBefore(button2, tables[index]);

                }
            } else if( request.message === "remove_buttons" ) {
                findingTables = false;

                var buttons = document.querySelectorAll("button[data-type='OpenCompareButton'");
                var index;
                var button;
                for (index = 0; index < buttons.length; index++) {
                    button = buttons[index];
                    button.parentNode.removeChild(button);
                }
            } else if( request.message === "get_find_button" ) {
                sendResponse(findingTables);
            }
        }
    );



})();

