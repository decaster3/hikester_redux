import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import FontAwesome from 'react-fontawesome';

class EventSearchingFiltersComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      cost: '',
      start_date: moment(),
      end_date: moment()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.clearFiltersOnView = this.clearFiltersOnView.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleChangeStartDate(date){
    this.setState({
      start_date: date
    });
  }
  handleChangeEndDate(date){
    this.setState({
      end_date: date
    });
  }

  filterEvents(){
    this.props.chanageFilters(this.state.cost, this.state.start_date, this.state.end_date)
  }

  clearFiltersOnView(){
    this.props.clearFilters()
  }

  render() {
    let s = this.state
    let p = this.props
    return(
      <div className="p-3">
          <input
            type="text"
            className="input-text"
            placeholder="Event Name.."/>

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
                  selected={s.end_date}
                  onChange={this.handleChangeEndDate}
                  className="input-date"
                />
                <FontAwesome name="calendar" className="input-date-icon" />
              </div>
            </div>
          </div>

          <label>
            Cost:
            <input name="cost" type = "text" defaultValue = {s.cost} onChange = {this.handleChange}/>
          </label>

          <div className="divider"></div>
          <div>
            <div className="title">Tags:</div>
            <div className="tags row">
              {p.tags}
            </div>
          </div>


        <button onClick = {() => this.filterEvents()}>filterEvents</button>
        <button onClick = {() => this.clearFiltersOnView()}>clear filters</button>
      </div>
    )
  }
}

export default EventSearchingFiltersComponent
