import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEventTagSearch } from '../../../actions/search_events/search_events_action'
import * as firebase from 'firebase'

class SearchingTags extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tagsView: null
    }
  }
  componentDidMount(){
    var tags = []
    var tagsContainer = {}
    let tagsRef = firebase.database().ref().child('tags')
    tagsRef.once('value', function(snapshot){
    tags = snapshot.val()
}).then(() => {
      tagsContainer = tags.map((tag, index) => {
      return (
        <div className="tags row">
          <div className="col-4">
            <div key = {index}className="ui toggle checkbox">
              <input onClick = {() => this.props.updateEventTagSearch(tag)} type="checkbox" name="public" defaultChecked={false} />
              <label>{tag}</label>
            </div>
          </div>
        </div>
      )
    })
    this.setState({
      tagsView: tagsContainer
    })
  })
}

  render() {
    let p = this.props
    let s = this.state
    return(
      <div>
        {s.tagsView}
      </div>
    )
  }
}
function mapStateToProps(state){
    return {
      search_events: state.search_events
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      updateEventTagSearch: updateEventTagSearch
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchingTags)
