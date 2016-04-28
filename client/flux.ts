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
  actions: Im.List<any>;
  lastAction: any;
  constructor(initialState: T, handler: (any, T) => T, actions: Array<any> = []) {
    super();
    this.state = initialState;
    this._handler = handler;
    this.actions = Im.List(actions);
    this.state = this.reduceActions(actions);
    dispatcher.register(this.register.bind(this));
  }
  reduceActions(actions) {
    return this.actions.reduce((state, action) => this._handler(action, state), this.state);
  }
  private register(action) {
    this.lastAction = action;
    this.actions = this.actions.push(action);
    const state = this.state;
    const nextState = this._handler(action, state);
    if (!Im.is(nextState, state)) {
      this.state = nextState;
      this.emitChange();
    }
  }
  getActions() {
    return this.actions.toArray();
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