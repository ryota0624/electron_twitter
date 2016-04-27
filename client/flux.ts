import { EventEmitter } from "events";
const CHANGE_EVENT = 'change';
import * as flux from "flux";
const Dispatcher = flux.Dispatcher;
export const dispatcher = new Dispatcher();
import * as Im from 'immutable';

const dispatch = dispatcher.dispatch.bind(dispatcher);
export const command = (type: string, props?) => {
  const action = Object.assign({}, props, { type });
  dispatch(action);
}

export default class StateStore<T> extends EventEmitter {
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
      this.emitChange();
    }
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
}