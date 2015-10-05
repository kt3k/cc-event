
var $ = global.jQuery = require('jquery');
require('class-component');

// Loads cc-event
require('./');

describe('Function.prototype.event', function () {
    'use strict';

    it('adds __events__ property to the function', function () {

        var f = function () {}.event('test');

        expect(f.__events__).to.be.an('array');

    });

    it('pushes the given event and selector to the __events__ array', function () {

        var f = function () {}.event('test0').event('test1', '.selector');

        expect(f.__events__[0].event).to.equal('test0');
        expect(f.__events__[0].selector).to.be.undefined;
        expect(f.__events__[1].event).to.equal('test1');
        expect(f.__events__[1].selector).to.equal('.selector');

    });

});

describe('$.cc.initEvents', function () {
    'use strict';

    var elem;

    before(function () {

        var Component = $.cc.subclass(function (pt) {

            pt.constructor = function (elem) {

                this.elem = elem;

                this.fooCalled = false;
                this.barCalled = false;

            };

            pt.foo = function () {

                this.fooCalled = true;

            }.event('foo');

            pt.bar = function () {

                this.barCalled = true;

            }.event('bar', '.btn');

        });

        $.cc.assign('component', Component);

    });

    beforeEach(function () {

        elem = $('<div><button class="btn">button</button></div>');

        var component = elem.cc.init('component');

        $.cc.initEvents(component);

    });

    it('sets event hanlders to component.elem according to the __events__ of the methods of component', function () {

        elem.trigger('foo');

        expect(elem.cc.get('component').fooCalled).to.be.true;

        elem.trigger('bar');

        expect(elem.cc.get('component').barCalled).to.be.false;

        elem.find('.btn').trigger('bar');

        expect(elem.cc.get('component').barCalled).to.be.true;

    });

});

describe('$.cc.Coelement', function () {
    'use strict';

    it('inits events at construction', function () {

        var Component = $.cc.subclass($.cc.Coelement, function (pt) {

            pt.spam = function () {

                this.spamCalled = true;

            }.event('spam');

        });

        $.cc.assign('coelement', Component);

        var elem = $('<div />');

        elem.cc.init('coelement');

        elem.trigger('spam');

        expect(elem.cc.get('coelement').spamCalled).to.be.true;

    });

});

describe('$.cc.Actor', function () {
    'use strict';

    it('inits events at construction', function () {

        var Actor = $.cc.subclass($.cc.Actor, function (pt) {

            pt.ham = function () {

                this.hamCalled = true;

            }.event('ham');

        });

        $.cc.assign('actor', Actor);

        var elem = $('<div />');

        elem.cc.init('actor');

        elem.trigger('ham');

        expect(elem.cc.getActor().hamCalled).to.be.true;

    });

});
