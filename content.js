/**
 * Created by hvallee on 7/23/15.
 */

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "find_tables" ) {


            var firstTable = $("table").clone().wrap('<table>').parent().html(); // without wrapping <table>, we only select the innerHTML

            chrome.runtime.sendMessage({"message": "convert_to_editor", "table": firstTable});
        }

        if( request.message === "replace_table" ) {
            console.log("dsdqsdqsdsq");
            var editor = '<iframe src="http://localhost:9000/embedPCM/'+request.id+'?enableEdit=false&enableExport=false&enableTitle=false&enableShare=false" ' +
                'scrolling="no"  width="100%" height="600px" style="border:none;"></iframe>';

            $("table").replaceWith(editor);

        }
    }
);
