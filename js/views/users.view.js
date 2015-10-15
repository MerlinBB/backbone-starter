(function ($, window, document, undefined) {
    "use strict";

    Starter.Views.Users = Backbone.StarterView.extend({
        events: {
            //
        },

        serialize: function (options) {
            var view = this;
            view.data = {};

            view.users = new Starter.Collections.Users([], {});

            $.when(
                view.users.fetch(),
                view.getTemplate({ t: "/templates/users.html", r: "template" })
            ).then(function () {
                view.data.users = view.users.toJSON();

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
