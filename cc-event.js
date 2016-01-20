/**
 * cc-event v2.0.2
 * author: Yoshiya Hinosawa ( @kt3k )
 */

(function ($) {
    /* eslint no-extend-native: 0 */
    'use strict'

    /**
     * The `event` postfix style annotation.
     *
     * @example
     *     prototype.startMusic = function () {
     *         // blah
     *     }.event('click', '.play-btn')
     *
     * @param {String} event The event name(s) (e.g. 'click touchstart')
     * @param {String} selector The selector (e.g. '.my-class', '#my-id')
     */
    Function.prototype.event = function (event, selector) {

        $.cc.event(event, selector)([this], 0)

        return this

    }

    /**
     * `event` method decorator.
     *
     * This decorator conforms to Yehuda Katz's proposal.
     * https://github.com/wycats/javascript-decorators
     *
     * This decorator registers the event object to the target method.
     *
     * @example
     *
     *     const event = $.cc.event
     *
     *     class Controller {
     *         @event('click', 'play-btn')
     *         startMusic() {
     *             // blah
     *         }
     *     }
     *
     * @param {String} event The event name(s) (e.g. 'click touchstart')
     * @param {String} selector The selector (e.g. '.my-class', '#my-id')
     */
    $.cc.event = function (event, selector) {

        return function (prototype, name) {

            var method = prototype[name]

            method.__events__ = method.__events__ || []

            method.__events__.push({event: event, selector: selector})

        }

    }

    /**
     * Initialize the dom events by event objects registered on each method.
     *
     * @private
     * @param {$.cc.Coelement} component The component
     */
    $.cc.initEvents = function (component) {

        // iterate over own properties and direct prototype's properties
        Object.getOwnPropertyNames(component).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(component))).map(function (name) {

            return component[name]

        }).filter(function (property) {

            return typeof property === 'function'

        }).filter(function (func) {

            return func.__events__ != null

        }).forEach(function (handler) {

            handler.__events__.forEach(function (obj) {

                component.elem.on(obj.event, obj.selector, function () {

                    handler.apply(component, arguments)

                })

            })

        })

    }

    /**
     * Modified version of Actor class.
     */
    $.cc.Actor = $.cc.subclass($.cc.Actor, function (pt, parent) {

        pt.constructor = function () {

            parent.constructor.apply(this, arguments)

            $.cc.initEvents(this)

        }

    })

    /**
     * Modified version of Coelement class.
     */
    $.cc.Coelement = $.cc.subclass($.cc.Coelement, function (pt, parent) {

        pt.constructor = function () {

            parent.constructor.apply(this, arguments)

            $.cc.initEvents(this)

        }

    })

})(jQuery)
