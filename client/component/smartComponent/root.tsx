import * as React from 'react'
import { ConnectComponent, provider } from './smartComponent';

class Root extends React.Component<any, any> {
  render() {
    console.log(this)
    return (
      <div>
        Root
        {this.props.children}
      </div>
    )
  }
}

export const Provider = provider.bind(this, Root);