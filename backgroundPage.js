/**
 * Created by hvallee on 7/28/15.
 */

(function(){
    "use strict";

    var gotIt = false;

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

            if( request.message === "store_gotIt_button" ) {
                gotIt = true
            } else if( request.message === "get_gotIt_button" ) {
                sendResponse(gotIt);
            }
        }
    );
})();

