import { EventEmitter } from "events";
const CHANGE_EVENT = 'change';
import * as flux from "flux";
const Dispatcher = flux.Dispatcher;
export const dispatcher = new Dispatcher();
import * as Im from 'immutable';

const dispatch = dispatcher.dispatch.bind(dispatcher);
export const command = (actionType: string, props?) => {
  const action = Object.assign({}, props, { actionType });
  dispatch(action);
}

export default class Store extends EventEmitter {
  state: any;
  constructor(initialState) {
    if(!initialState) throw new ReferenceError('初期stateが与えられていませんs');
    super();
    this.state = initialState;
  }

  register(handler) {
    if(!handler) throw new ReferenceError('handlerが与えられていません');
    if(typeof handler !== 'function') throw new TypeError('handlerは関数です');
    dispatcher.register(handler);
  }

  get() {
    return this.state
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener( callback ) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener( callback ) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  init(initState) {
    this.state = initState;
  }
}

export class StateStore<T> extends EventEmitter {
  state: T;
  _handler: (any, T) => T;
  constructor(initialState: T, handler: (any, T) => T) {
    super();
    this.state = initialState;
    this._handler = handler;
    dispatcher.register(this.register.bind(this));
  }

  private register(action) {
    const state = this.state;
    const nextState = this._handler(action, state);
    if (!Im.is(nextState, state)) {
      this.state = nextState;
      this.saveLocal();
      this.emitChange();
    }
  }
  saveLocal() {}
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