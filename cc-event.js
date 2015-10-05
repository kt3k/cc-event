/**
 * cc-event v1.0.1
 * author: Yoshiya Hinosawa ( @kt3k )
 */

(function ($) {
    'use strict';

    Function.prototype.event = function (event, selector) {

        this.__events__ = this.__events__ || [];

        this.__events__.push({event: event, selector: selector});

        return this;

    };

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

    $.cc.Actor = $.cc.subclass($.cc.Actor, function (pt, parent) {

        pt.constructor = function () {

            parent.constructor.apply(this, arguments);

            $.cc.initEvents(this);

        }

    });

    $.cc.Coelement = $.cc.subclass($.cc.Coelement, function (pt, parent) {

        pt.constructor = function () {

            parent.constructor.apply(this, arguments);

            $.cc.initEvents(this);

        };

    });

})(jQuery);
