/**
 * Created by hvallee on 7/23/15.
 */

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "find_tables" ) {
            var firstTable = $("table[class$='reference']").html();

            console.log(firstTable);

            // This line is new!
            //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
        }
    }
);
