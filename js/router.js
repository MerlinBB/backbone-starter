(function ($, window, document, undefined) {
    "use strict";

    var StarterRouter = Backbone.Router.extend({
        routes: {
            "":           "users",
            "users/:id":  "user",
            "*404":       "lost"
        },

        // Track route changes in GA
        initialize: function () {
            this.bind("route", function () {
                if (window.ga) {
                    window.ga("send", "pageView", "/" + Backbone.history.fragment);
                }
            });
        },

        // Views
        users: function () {
            $.each([
                new Starter.Views.Header({ title: "Welcome" }),
                new Starter.Views.Users()
            ], function (index, view) {
                view.render();
            });
        },

        user: function (id) {
            $.each([
                new Starter.Views.Header({ title: "User View" }),
                new Starter.Views.User({ id: id })
            ], function (index, view) {
                view.render();
            });
        },

        lost: function () {
            $.each([
                new Starter.Views.Static({
                    template: "lost.html"
                })
            ], function (index, view) {
                view.render();
            });
        }
    });

    Starter.Router = new StarterRouter();

    $(document).on("click", "a[href^='/']", function (e) {
        var route = $(e.currentTarget).attr("href");
        if (!$(e.currentTarget).data("bypass")) {
            e.preventDefault();
            Starter.Router.navigate(route, { trigger: true });
        }
    });

    window.onpopstate = function (e) {
        var route = document.location.pathname;
        Starter.Router.navigate(route, { trigger: true });
    };

})(jQuery, window, document);
