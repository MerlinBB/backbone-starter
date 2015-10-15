(function ($, window, document, undefined) {
    "use strict";

    Starter.Models.User = Backbone.StarterModel.extend({
        idAttribute: "id",
        url: function () {
            var url = Starter.Config.stubs + "users/" + this.attributes.id + ".json";
            return url;
        }
    });

})(jQuery, window, document);
