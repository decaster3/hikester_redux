import React, { Component } from 'react'
import CreationTags from '../creation_tags'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewEvent } from '../../../../actions/events_creation/events_creation'

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EventCreationFormContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      address: '',
      cost: '',
      start_time: '',
      end_date: '',
      description: '',
      lat: '',
      lng: '',
      name: '',
      max_people_count: '',
      start_date: moment(),
      type: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleChangeStartDate(date){
    console.log(date.format());
    this.setState({
      start_date: date
    });
  }

  render() {
    let s = this.state
    let p = this.props
    return(
      <div>
        Form fields

        <label>
          Detail Address:
          <input name="address" type = "text" defaultValue = {s.address} onChange = {this.handleChange}/>
        </label>

        <label>
          Cost:
          <input name="cost" type = "text" defaultValue = {s.cost} onChange = {this.handleChange}/>
        </label>

        <label>
          start_time:
          <input name="start_time" type = "text" defaultValue = {s.start_time} onChange = {this.handleChange}/>
        </label>

        <label>
          end_time:
          <input name="end_time" type = "text" defaultValue = {s.end_time} onChange = {this.handleChange}/>
        </label>

        <label>
          description:
          <input name="description" type = "text" defaultValue = {s.description} onChange = {this.handleChange}/>
        </label>

        <label>
          name:
          <input name="name" type = "text" defaultValue = {s.name} onChange = {this.handleChange}/>
        </label>

        <label>
          max_people_count:
          <input name="max_people_count" type = "text" defaultValue = {s.max_people_count} onChange = {this.handleChange}/>
        </label>

        <label>
          start_date:
          <DatePicker
            selected={s.start_date}
            onChange={this.handleChangeStartDate}
          />
        </label>

        <br/>
        <CreationTags />
        <br/>
        <button onClick = {() => p.createNewEvent(
              s.address,
              s.cost,
              s.end_time,
              s.start_time,
              s.description,
              s.lat,
              s.lng,
              s.name,
              s.max_people_count,
              s.start_date)}>Submit</button>
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
      new_event: state.new_event
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      createNewEvent: createNewEvent
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreationFormContainer)
