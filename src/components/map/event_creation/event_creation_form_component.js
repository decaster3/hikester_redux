import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'antd/lib/time-picker';  // for js
import 'antd/lib/time-picker/style/index.css';
class EventCreationFormComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      address: '',
      cost: '',
      description: '',
      lat: '',
      lng: '',
      name: '',
      max_people_count: '',
      start_date: moment().set({'hour': 12, 'minute': 0}),
      end_date: moment().add(1, 'day').set({'hour': 12, 'minute': 0}),
      type: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleStartDateChanges = this.handleStartDateChanges.bind(this);
    this.handleEndDateChanges = this.handleEndDateChanges.bind(this);
    this.handleStartTimeChanges = this.handleStartTimeChanges.bind(this);
    this.handleEndTimeChanges = this.handleEndTimeChanges.bind(this);
  }
//
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleStartTimeChanges(date) {
    var start_date = this.state.start_date.set({
      hour: date.get("hour"),
      minute: date.get("minute")
    });

    this.setState({
      start_date
    });
  }

  handleEndTimeChanges(date) {
    var end_date = this.state.start_date.set({
      hour: date.get("hour"),
      minute: date.get("minute")
    });

    this.setState({
      end_date
    });
  }

  handleStartDateChanges(date) {

    this.setState({
      start_date: date
    });
  }

  handleEndDateChanges(date) {

    this.setState({
      end_date:date
    });
  }


  render() {
    var end = moment(this.state.end_date);
    console.log(end);

    const timeFormat = 'HH:mm';
    let s = this.state
    let p = this.props
    return (
      <div className="panel">
        {
          (p.user.emailVerified || p.user.phoneVerified)?
            (<div className="p-3">

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
                      onChange={this.handleStartDateChanges}
                      className="input-date"
                      minDate={moment()}
                      maxDate={end}
                    />
                    <FontAwesome name="calendar" className="input-date-icon" />
                  </div>
                  <div className="mt-3">
                    <TimePicker defaultValue={moment(s.start_date, timeFormat)} format={timeFormat} onChange={this.handleStartTimeChanges} />
                  </div>
                </div>
                <div className="col">
                  <div className="input-date-group">
                    <DatePicker
                      selected={s.end_date}
                      onChange={this.handleEndDateChanges}
                      className="input-date"
                      minDate={s.start_date}
                    />
                    <FontAwesome name="calendar" className="input-date-icon" />
                  </div>
                  <div className="mt-3">
                    <TimePicker defaultValue={moment(s.end_date, timeFormat)} format={timeFormat} onChange={this.handleEndTimeChanges} />
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
                Maximum number of people:
                <input name="max_people_count" type = "text" defaultValue = {s.max_people_count} onChange = {this.handleChange}/>
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
                  s.start_date,
                  s.end_date,
                  s.description,
                  s.lat,
                  s.lng,
                  s.name,
                  s.max_people_count
                  )}
                  className="button button-fluid">
              Create
            </button>


            )
            :
            (p.user.currently == "ANONYMOUS"?
              <div>
                <p>You need to login for creating events</p>
              </div>
            :
              <div>
                <p>You can't create events! Verify email or phone in settings</p>
              </div>
            )
        }
      </div>

    )
  }
}
export default EventCreationFormComponent
