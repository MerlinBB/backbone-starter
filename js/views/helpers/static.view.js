(function ($, window, document, undefined) {
    "use strict";

    Starter.Views.Static = Backbone.StarterView.extend({
        serialize: function (options) {
            var view = this;
            var template;
            var data = {};

            view.template = "/templates/" + options.template;

            if (options.redirect) {
                Starter.Config.redirect = options.redirect;
            }

            $.when(
                view.getTemplate({ t: view.template, r: "template" })
            ).then(function () {
                view.render(view.template, data);
            });
        }
    });

})(jQuery, window, document);
