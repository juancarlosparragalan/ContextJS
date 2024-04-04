var util = require('util');

function Context(namespace) {
    if (!(this instanceof Context)) {
        return new Context(namespace);
    }
    console.log('namespace', namespace)
    if (namespace) {
        Object.defineProperty(this, namespace, {
            value: {},
            writable: false,
            enumerable: true,
            configurable: false,
        });
    }
    Object.defineProperty(this, 'set', {
        value: bindSetter(),
        writable: false,
        enumerable: false,
        configurable: false,
    });
    console.log('this', this)
}

function bindSetter(setter, thisObj, ns) {

    return function (name, value, readOnly) {
        console.log(setter)
        return ''
    };
}

let ctx = new Context('a');
ctx.set('x')
console.log('ctx', ctx)