/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {

        /**
         * Sorts by most viewed and refreshes
         */
        function sortByMostViewed(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "sortByMostViewed"
            });
        }

        /**
         * Sorts by most viewed and refreshes
         */
        function showAllVideos(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "showAllVideos"
            });
        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Could not sort by most viewed: ${error}`);
        }

        /**
         * Get the active tab,
         */
        if (e.target.classList.contains("mostViewed")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(sortByMostViewed)
                .catch(reportError);
        } else if (e.target.classList.contains("allVideos")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(showAllVideos)
                .catch(reportError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({ file: "/content_scripts/youtubesorter.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);