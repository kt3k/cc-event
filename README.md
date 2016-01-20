# cc-event v2.0.2 [![Build Status](https://travis-ci.org/kt3k/cc-event.svg?branch=master)](https://travis-ci.org/kt3k/cc-event) [![codecov.io](http://codecov.io/github/kt3k/cc-event/coverage.svg?branch=master)](http://codecov.io/github/kt3k/cc-event?branch=master)

> An event utility for class-component [experimental]

# Usage

npm

```sh
npm install --save jquery class-component cc-event
```

common script

```js
global.jQuery = require('jquery');
require('class-component');
require('cc-event');
```

```js

var $ = require('jquery');

var Scene = $.cc.subclass($.cc.Actor, function (pt) {

    /**
     * Says hello.
     */
    pt.sayHello = function () {

        alert('hello');

    }.event('click touchstart');

    /**
     * Goes to the settings screen.
     */
    pt.gotoSettings = function (e) {

        e.stopPropagation();

        location.href = 'settings.html';

    }.event('click', '.setting-btn');

});

$.cc.assign('scene', Scene);
```

```html
<div class="scene" >
  <button class="settings-btn">settings</div>
</div>
```

Under the above settings, when you click the settings button it goes to `settings.html`. When you click other part of `.scene`, it alerts "hello".

### Use with es6 class and decorator

```js

var $ = require('jquery');
var event = $.cc.event;

class Scene extends $.cc.Actor {

    /**
     * Says hello.
     */
    @event('click touchstart')
    sayHello() {

        alert('hello');

    }

    /**
     * Goes to the settings screen.
     */
    @event('click', '.setting-btn')
    gotoSettings(e) {

        e.stopPropagation();

        location.href = 'settings.html';

    }

}

$.cc.assign('scene', Scene);
```

```html
<div class="scene" >
  <button class="settings-btn">settings</div>
</div>
```

# License

MIT
