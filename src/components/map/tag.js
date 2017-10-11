import React, { Component } from 'react'

class Tag extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let p = this.props
    let tag = p.tag
    return (
      <div>
        <button onClick = {() => p.onclick(tag)}>{tag}</button>)
      </div>
    )
  }
}
export default Tag
