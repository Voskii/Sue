import React from 'react'

class ForceUpdateMethod extends React.Component {
  handleClick() {
    this.forceUpdate();
  }

  componentDidUpdate() {
    console.log('Rerender');
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>Button (forceUpdate method)</button>;
  }
}