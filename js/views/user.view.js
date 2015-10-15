(function ($, window, document, undefined) {
    "use strict";

    Starter.Views.User = Backbone.StarterView.extend({
        events: {
            //
        },

        serialize: function (options) {
            var view = this;
            view.data = {};

            view.user = new Starter.Models.User({ id: options.id });

            $.when(
                view.user.fetch(),
                view.getTemplate({ t: "/templates/user.html", r: "template" })
            ).then(function () {
                view.data.user = view.user.toJSON();

                view.render(view.template, view.data);
            }).fail(function (model, response) {
                alert("oh no!");
            });
        },

        afterRender: function () {
            var view = this;
            //
        }
    });

})(jQuery, window, document);
