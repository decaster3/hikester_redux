import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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
      <div>
        Form fields

        <label>
          Cost:
          <input name="cost" type = "text" defaultValue = {s.cost} onChange = {this.handleChange}/>
        </label>

        <label>
          start_date:
          <DatePicker
            selected={s.start_date}
            onChange={this.handleChangeStartDate}
          />
        </label>

        <label>
          end_date:
          <DatePicker
            selected={s.end_date}
            onChange={this.handleChangeEndDate}
          />
        </label>

        <br/>
        {p.tags}
        <br/>
        <button onClick = {() => this.filterEvents()}>filterEvents</button>
        <button onClick = {() => this.clearFiltersOnView()}>clear filters</button>
      </div>
    )
  }
}

export default EventSearchingFiltersComponent
