import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchingTags from '../searching_tags'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { chanageFilters, startListeningEvents } from '../../../../actions/search_events/search_events_action'
import 'react-datepicker/dist/react-datepicker.css';

class EventSearchingFiltersContainer extends Component {

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
  handleChangeEndDate(date){
    console.log(date.format());
    this.setState({
      end_date: date
    });
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
        <SearchingTags />
        <br/>
        <button onClick = {() => p.chanageFilters(s.cost, s.start_date, s.end_date)}>chanageFilters</button>
        <button onClick = {() => p.startListeningEvents()}>startListeningEvents</button>

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
      startListeningEvents: startListeningEvents,
      chanageFilters: chanageFilters
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSearchingFiltersContainer)
