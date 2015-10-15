(function ($, window, document, undefined) {
    "use strict";

    window.Starter = {
        Cache: {
            Templates: {},
            Models: {},
            Collections: {}
        },
        Views: {},
        Models: {},
        Collections: {},
        Router: {}
    };

    Starter.init = function () {
        Backbone.history.start({ pushState: true });
    };

    // default view
    Backbone.StarterView = Backbone.View.extend({
        el: ".view.page",

        initialize: function (options) {
            var view = this;
            view.$el.html("<div class='spinner'></div>");
            $(this.$el).off();
            this.serialize(options);
        },

        getTemplate: function (template) {
            // if the template is in the cache return that, other wise return the get request
            var view = this;
            if (Starter.Cache.Templates[template.t]) {
                view[template.r] = Starter.Cache.Templates[template.t];
                return;
            } else {
                var cacheBust = "?" + Math.random().toString(36).slice(2);
                return $.get(template.t + cacheBust, function (response) {
                    view[template.r] = response;
                    Starter.Cache.Templates[template.t] = response;
                });
            }
        },

        render: function (template, data, options) {
            var view = this;
            if (template && data) {
                view.$el.html(_.template(template, data));
                $(window).scrollTop(0, 0);
                view.afterRender();
            }
        },
        serialize: function () {},
        afterRender: function () {}
    });

    Backbone.StarterCollection = Backbone.Collection.extend({
        invalidateCache: function () {
            var collection = this;
            var url = collection.url();

            if (Starter.Cache.Collections[url]) {
                Starter.Cache.Collections[url] = undefined;
            }
        },

        fetch: function (options) {
            var collection = this;
            var url = collection.url();

            // Only fetch it from the server once. If you want real fetch, use refetch
            if (!Starter.Cache.Collections[url]) {
                Starter.Cache.Collections[url] = Backbone.Collection.prototype.fetch.call(collection, options);
            }

            // The default behaviour for fetching a collection is to update
            // the collection models with the response. When trying to fetch
            // an already cached collection the caller's models aren't updated.
            // This will do the trick.
            return Starter.Cache.Collections[url].done(function (cachedCollection) {
                collection.reset(cachedCollection);
            });
        },

        refetch: function (options) {
            // Straight passthrough to the real backbone fetch
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });

    Backbone.StarterModel = Backbone.Model.extend({
        invalidateCache: function () {
            var model = this;
            var url = model.url();

            if (Starter.Cache.Models[url]) {
                Starter.Cache.Models[url] = undefined;
            }
        },

        fetch: function (options) {
            var model = this;
            var url = model.url();

            // Only fetch it from the server once. If you want real fetch, use refetch
            if (!Starter.Cache.Models[url]) {
                Starter.Cache.Models[url] = Backbone.Collection.prototype.fetch.call(model, options);
            }

            // The default behaviour for fetching a collection is to update
            // the collection models with the response. When trying to fetch
            // an already cached collection the caller's models aren't updated.
            // This will do the trick.
            return Starter.Cache.Models[url].done(function (cachedModel) {
                model.set(cachedModel);
            });
        },

        refetch: function (options) {
            // Straight passthrough to the real backbone fetch
            return Backbone.Model.prototype.fetch.call(this, options);
        }
    });

    // Let's go!
    $(window).load(function () { Starter.init(); });

})(jQuery, window, document);
