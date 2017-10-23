import React, { Component } from 'react'

class Tag extends Component {

  constructor(props) {
    super(props)
    this.state = {
      trunedOn: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    var state = !this.state.turnedOn;
    this.props.onclick(this.props.tag.name, state);
    this.setState({turnedOn: state});
  }

  render() {
    let p = this.props;
    let tag = p.tag;
    return (
      <div className="col-4">
        <div className="ui toggle checkbox">
          <input onClick = {this.clickHandler} type="radio" id={"tag_selector_id" + '_' + this.props.tag.name} name="public" defaultChecked={this.props.tag.selected} />
          <label htmlFor={"tag_selector_id" + '_' + this.props.tag.name}>{this.props.tag.name}</label>
        </div>
      </div>
    )
  }
}
export default Tag
