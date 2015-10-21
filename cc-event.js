/**
 * cc-event v1.0.1
 * author: Yoshiya Hinosawa ( @kt3k )
 */

(function ($) {
    'use strict';

    /**
     * The `event` postfix style annotation.
     *
     * @example
     *     prototype.startMusic = function () {
     *         // blah
     *     }.event('click', '.play-btn');
     *
     * @param {String} event The event name(s) (e.g. 'click touchstart')
     * @param {String} selector The selector (e.g. '.my-class', '#my-id')
     */
    Function.prototype.event = function (event, selector) {

        return $.cc.event(event, selector)(this);

    };

    /**
     * `event` decorator.
     *
     * This decorator registers the event object to the decorating methods.
     *
     * @example
     *
     *     class Controller {
     *         @$.cc.event('click', 'play-btn')
     *         startMusic() {
     *             // blah
     *         }
     *     }
     *
     * @param {String} event The event name(s) (e.g. 'click touchstart')
     * @param {String} selector The selector (e.g. '.my-class', '#my-id')
     */
    $.cc.event = function (event, selector) {

        return function (func) {

            func.__events__ = func.__events__ || [];

            func.__events__.push({event: event, selector: selector});

            return func;

        };

    };

    /**
     * Initialize the dom events by event objects registered on each method.
     *
     * @private
     * @param {$.cc.Coelement} component The component
     */
    $.cc.initEvents = function (component) {

        for (var i in component) {

            var func = component[i];

            if (typeof func !== 'function') {

                continue;

            }

            if (!func.__events__) {

                continue;

            }

            func.__events__.forEach(function (obj) {

                var func = this;

                component.elem.on(obj.event, obj.selector, function () {

                    func.apply(component, arguments);

                });

            }, func);

        }

    };

    /**
     * Modified version of Actor class.
     */
    $.cc.Actor = $.cc.subclass($.cc.Actor, function (pt, parent) {

        pt.constructor = function () {

            parent.constructor.apply(this, arguments);

            $.cc.initEvents(this);

        }

    });

    /**
     * Modified version of Coelement class.
     */
    $.cc.Coelement = $.cc.subclass($.cc.Coelement, function (pt, parent) {

        pt.constructor = function () {

            parent.constructor.apply(this, arguments);

            $.cc.initEvents(this);

        };

    });

})(jQuery);
