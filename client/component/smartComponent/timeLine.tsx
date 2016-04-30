import * as React from 'react'
import { ConnectComponent, provider } from './smartComponent';

// export default (store) => {
//   return class TimeLine extends ConnectComponent<any, any> {
//     render() {
//       const tweetStore = JSON.stringify(store.tweetStore.get().toJS());
//       return (
//         <div>
//           {tweetStore}
//         </div>
//       )
//     }
//   }
// }

export default class TimeLine extends ConnectComponent<any, any> {
  render() {
      return (
        <div>
          
        </div>
      )
    }
  }