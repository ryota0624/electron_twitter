import * as React from 'react'

export class ConnectComponent<T, U> extends React.Component<T, U> {
  static get contextTypes() {
    return {
      router: React.PropTypes.any,
      store: React.PropTypes.any,
    }
  }
  context: {
    router: any
    store: any
  }
}

export function provider(component, store) {
  return class Provider extends React.Component<any, any> {
    static get contextTypes() {
      return {
        router: React.PropTypes.any,
        store: React.PropTypes.any,
      }
    }
    static get childContextTypes() {
      return {
        store: React.PropTypes.any
      }
    }
    context: {
      router: any
      store: any
    }
    getChildContext() {
      return { store }
    }
    render() {
      console.log(this.props.children)
      return (
        <div>
          { React.createElement(component, store, this.props.children) }
        </div>  
      )
    }
  }
}