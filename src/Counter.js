import React, { Component } from 'react';

// const Counter = ({ count }) => {
//   return (
//     <div>
//       Counter: { count }
//     </div>
//   )
// }
// //
class Counter extends Component {
  // componentWillReceiveProps(nextProps) {
  //   this.props
  // }
  render() {
    return (
      <div>
        Counter: {this.props.count}
      </div>
    )
  }
}

export default Counter;
