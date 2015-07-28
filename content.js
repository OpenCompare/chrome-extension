/**
 * Created by hvallee on 7/23/15.
 */

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "find_tables" ) {

            var editor = '<iframe src="http://opencompare.org:/embedPCM/55968380975a03aaae9945a3?enableEdit=false&enableExport=false&enableTitle=false&enableShare=false" ' +
                'scrolling="no"  width="100%" height="600px" style="border:none;"></iframe>';

            var firstTable = $("table").clone().wrap('<table>').parent().html(); // without wrapping <table>, we only select the innerHTML
           // $("table").replaceWith(editor);
            console.log(firstTable);

            chrome.runtime.sendMessage({"message": "convert_to_editor", "table": firstTable});
        }
    }
);
