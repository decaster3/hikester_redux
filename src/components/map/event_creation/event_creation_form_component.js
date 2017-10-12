import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EventCreationFormComponent extends Component {

  constructor(props) {
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
      finish_date: moment(),
      type: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleChangeStartDate(date){
    this.setState({
      start_date: date
    });
  }

  render() {

    let s = this.state
    let p = this.props
    return(
      <div className="panel">
        <div className="p-3">

          <input
            type="text"
            className="input-text"
            placeholder="Event Name.."
            name="name"
            type = "text"
            defaultValue = {s.name}
            onChange = {this.handleChange}/>

          <div className="row mt-3">
            <div className="col">
              <div className="input-date-group">
                <DatePicker
                  selected={s.start_date}
                  onChange={this.handleChangeStartDate}
                  className="input-date"
                />
                <FontAwesome name="calendar" className="input-date-icon" />
              </div>
            </div>
            <div className="col">
              <div className="input-date-group">
                <DatePicker
                  selected={s.finish_date}
                  className="input-date"
                />
                <FontAwesome name="calendar" className="input-date-icon" />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <textarea className="input-text" placeholder="Description" name="description" type = "text" defaultValue = {s.description} onChange = {this.handleChange}/>
          </div>



          <label>
            Cost:
            <input name="cost" type = "text" defaultValue = {s.cost} onChange = {this.handleChange}/>
          </label>

          <label>
            max_people_count:
            <input name="max_people_count" type = "text" defaultValue = {s.max_people_count} onChange = {this.handleChange}/>
          </label>

          <label>
            start_time:
            <input name="start_time" type = "text" defaultValue = {s.start_time} onChange = {this.handleChange}/>
          </label>

          <label>
            end_time:
            <input name="end_time" type = "text" defaultValue = {s.end_time} onChange = {this.handleChange}/>
          </label>

          <div className="divider"></div>

          <div>
            <div className="title">Tags:</div>
            <div className="tags row">
              {p.tags}
            </div>
          </div>


          <div className="mt-3 mb-0 alert alert-warning" role="alert">
            Before creating an event choose place on the map
          </div>
        </div>

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
              s.start_date)}
              className="button button-fluid">
          Create
        </button>

      </div>
    )
  }
}
export default EventCreationFormComponent
