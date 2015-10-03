/**
 * cc-event v0.1.0
 * author: Yoshiya Hinosawa ( @kt3k )
 */

(function () {
    'use strict';

    Function.prototype.event = function (event, selector) {

        this.__events__ = this.__events__ || [];

        this.__events__.push({event: event, selector: selector});

        return this;

    };

    $.cc.initEvents = function (component) {

        var self = this;

        for (var i in component) {

            var func = component[i];

            if (typeof func !== 'function') {

                continue;

            }

            if (!func.__events__) {

                continue;

            }

            func.__events__.forEach(function (obj) {

                component.elem.on(obj.event, obj.selector, function () {

                    func.apply(self, arguments);

                });

            });

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

})();
