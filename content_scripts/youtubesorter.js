(function() {
    /**
     * Sort by most viewed
     */
    function sortByMostViewedAction() {
        if (!window.location.href.includes("?view=0&sort=p&flow=grid")) {
            var url = window.location.href.split('?')[0];
            window.history.pushState('', '', url + '?view=0&sort=p&flow=grid');
            document.location.reload();
        }
    }

    /**
     * Show all uploaded videos
     */
    function showAllVideosAction() {
        if (!window.location.href.includes("?list=")) {
            var url = window.location.href.split('?')[0];
            window.history.pushState('', '', url + '?list=UL');
            document.location.reload();
        }
    }

    /**
     * Listen for messages from the background script.
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "sortByMostViewed") {
            sortByMostViewedAction();
        } else if (message.command === "showAllVideos") {
            showAllVideosAction();
        }
    });

})();