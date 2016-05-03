import * as React from 'react'
import { provider } from '../../flux';
import SidebarComponent from './sidebar';
const Sidebar: any = SidebarComponent;
class Root extends React.Component<any, any> {
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-1-10  uk-block-primary">
          {/*<Sidebar />*/}
        </div>
        <div className="uk-width-9-10">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default provider.bind(this, Root);