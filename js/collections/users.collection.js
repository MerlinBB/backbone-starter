(function ($, window, document, undefined) {
    "use strict";

    Starter.Collections.Users = Backbone.StarterCollection.extend({
        initialize: function (models, options) {
            this.options = options;
        },

        url: function () {
            var url = Starter.Config.stubs + "users.json";
            return url;
        },

        parse: function (response) {
            return response;
        }
    });

})(jQuery, window, document);
