(function ($, window, document, undefined) {
    "use strict";

    Starter.Helpers = {

        invalidateCache: function (type) {
            if (type === "models") {
                Starter.Cache.Models = {};
            }

            if (type === "collections") {
                Starter.Cache.Collections = {};
            }

            if (type === "all") {
                Starter.Cache.Models = {};
                Starter.Cache.Collections = {};
            }
        }
    };

})(jQuery, window, document);
