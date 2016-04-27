"use strict";
const events_1 = require("events");
const CHANGE_EVENT = 'change';
const flux = require("flux");
const Dispatcher = flux.Dispatcher;
exports.dispatcher = new Dispatcher();
const Im = require('immutable');
const dispatch = exports.dispatcher.dispatch.bind(exports.dispatcher);
exports.command = (actionType, props) => {
    const action = Object.assign({}, props, { actionType: actionType });
    dispatch(action);
};
class Store extends events_1.EventEmitter {
    constructor(initialState) {
        if (!initialState)
            throw new ReferenceError('初期stateが与えられていませんs');
        super();
        this.state = initialState;
    }
    register(handler) {
        if (!handler)
            throw new ReferenceError('handlerが与えられていません');
        if (typeof handler !== 'function')
            throw new TypeError('handlerは関数です');
        exports.dispatcher.register(handler);
    }
    get() {
        return this.state;
    }
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
    init(initState) {
        this.state = initState;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Store;
class StateStore extends events_1.EventEmitter {
    constructor(initialState, handler) {
        super();
        this.state = initialState;
        this._handler = handler;
        exports.dispatcher.register(this.register.bind(this));
    }
    register(action) {
        const state = this.state;
        const nextState = this._handler(action, state);
        if (!Im.is(nextState, state)) {
            this.state = nextState;
            this.saveLocal();
            this.emitChange();
        }
    }
    saveLocal() { }
    get() {
        return this.state;
    }
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}
exports.StateStore = StateStore;
