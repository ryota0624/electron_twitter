import { EventEmitter } from "events";
import * as React from 'react'
import * as flux from "flux";
const CHANGE_EVENT = 'change';
import * as Im from 'immutable';

const Dispatcher = flux.Dispatcher;
export const dispatcher = new Dispatcher();

const dispatch = dispatcher.dispatch.bind(dispatcher);
export const command = (type: string, props?) => {
  const action = Object.assign({}, props, { type });
  dispatch(action);
}

export class ChangeEmitter extends EventEmitter {
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

export default class StateStore<T> extends ChangeEmitter {
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
    const state = this.state;
    const nextState = this._handler(action, state);
    if (!Im.is(nextState, state)) {
      this.lastAction = action;
      this.actions = this.actions.push(action);
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
}

export class StoreContainer extends ChangeEmitter {
  stores;
  constructor(stores) {
    super();
    this.stores = stores;
    const keys = Object.keys(this.stores);
    keys.forEach(key => {
      this.stores[key].addChangeListener(this.emitChange.bind(this));
    })
  }
  getStore(storeName) {
    return this.stores[storeName];
  }
  getAllStore() {
    return this.stores
  }
}

export const connect = (component) => {
  return class ConnectComponent extends React.Component<any, any> {
    constructor(props, context) {
      super(props, context);
      this.context = context;
      this.onChange = this.onChange.bind(this);
      this.context.storeContainer.addChangeListener(this.onChange);
      this.state = {
        storeContainer: this.context.storeContainer
      }
    }
    componentWillUnmount() {
      this.context.storeContainer.removeChangeListener(this.onChange);
    }
    onChange() {
      this.setState({ storeContainer: this.context.storeContainer });
    }
    static get contextTypes() {
      return {
        router: React.PropTypes.any,
        storeContainer: React.PropTypes.any,
      }
    }
    render() {
      const storeContainer = this.state.storeContainer;
      const stores = this.state.storeContainer.getAllStore();
      const router = this.context.router;
      stores.router = router;
      return React.createElement(component, stores);
    }
    context: {
      router: any;
      storeContainer: StoreContainer;
    }
    props: {
      storeContainer: StoreContainer;
    }
    state: {
      storeContainer: StoreContainer;
    }
  }
}

export function provider(component, storeContainer: StoreContainer) {
  return class Provider extends React.Component<any, any> {
    static get contextTypes() {
      return {
        router: React.PropTypes.any,
        storeContainer: React.PropTypes.any,
      }
    }
    static get childContextTypes() {
      return {
        storeContainer: React.PropTypes.any
      }
    }
    context: {
      router: any
      storeContainer: any
    }
    getChildContext() {
      return { storeContainer }
    }
    render() {
      return React.createElement(component, { storeContainer }, this.props.children);
    }
  }
}

export class SmartComponent<T, U> extends React.Component<T, U> {
  event: EventEmitter;
  constructor(props, context) {
    super(props, context);
    this.event = new EventEmitter();
    this.dispatch = this.dispatch.bind(this);
    this.subscribe();
  }
  on(str, fn) {
    this.event.addListener(str, fn);
  }
  getChildContext() {
    const dispatch = this.dispatch;
    return { dispatch }
  }
  dispatch(type, ...args) {
    const argArray = [].concat([type], args);
    this.event.emit.apply(this.event, argArray);
  }
  static get childContextTypes() {
    return {
      dispatch: React.PropTypes.any
    }
  }
  subscribe() {//overload
    
  }
}

export interface Collection<T> extends Im.Map<string, T> {}
export class CollectionStore<T> extends ChangeEmitter {
  state: Collection<T>;
  _handler: (any, Collection) => Collection<T>;
  actions: Im.List<any>;
  lastAction: any;
  constructor(handler: (any, Collection) => Collection<T>, actions: Array<any> = [], initialState: Im.Map<string, T>) {
    super();
    this.state = initialState || Im.Map<string, T>();
    this._handler = handler;
    this.actions = Im.List(actions);
    this.state = this.reduceActions(actions);
    dispatcher.register(this.register.bind(this));
  }
  reduceActions(actions) {
    return this.actions.reduce((state, action) => this._handler(action, state), this.state);
  }
  private register(action) {
    const state = this.state;
    const nextState = this._handler(action, state);
    if (!Im.is(nextState, state)) {
      this.lastAction = action;
      this.actions = this.actions.push(action);
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
}
