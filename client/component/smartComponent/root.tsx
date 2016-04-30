import * as React from 'react'
import { provider } from '../../flux';

class Root extends React.Component<any, any> {
  render() {
    return (
      <div>
        Root
        {this.props.children}
      </div>
    )
  }
}

export default provider.bind(this, Root);