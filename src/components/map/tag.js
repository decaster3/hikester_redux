import React, { Component } from 'react'

class Tag extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let p = this.props
    let tag = p.tag
    return (
      <div className="col-4">
        <div className="ui toggle checkbox">
          <input onClick = {() => p.onclick(tag.name)} type="checkbox" id={"tag_selector_id" + '_' + this.props.tag.name} name="public" defaultChecked={this.props.tag.selected} />
          <label htmlFor={"tag_selector_id" + '_' + this.props.tag.name}>{this.props.tag.name}</label>
        </div>
      </div>
    )
  }
}
export default Tag
