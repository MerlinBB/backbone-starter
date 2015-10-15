(function ($, window, document, undefined) {
    "use strict";

    Starter.Views.Header = Backbone.StarterView.extend({
        el: $(".view.header"),

        events: {
            //
        },

        initialize: function (options) {
            var view = this;
            view.$el.html("");
            $(this.$el).off();
            this.serialize(options);
        },

        serialize: function (options) {
            var view = this;
            view.data = {};

            view.data.title = options.title;

            $.when(
                view.getTemplate({ t: "/templates/helpers/header.html", r: "template" })
            ).then(function () {
                view.render(view.template, view.data);
            });
        }
    });

})(jQuery, window, document);
