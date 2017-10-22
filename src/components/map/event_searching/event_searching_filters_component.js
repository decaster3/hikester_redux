import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import FontAwesome from 'react-fontawesome';

export default class EventSearchingFiltersComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      cost: '',
      start_date: moment(),
      end_date: moment().add(1, 'day'),
      costFrom: 0,
      costTo: 1000,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleCostFromChange = this.handleCostFromChange.bind(this);
    this.handleCostToChange = this.handleCostToChange.bind(this);
  }

  handleChange(event){

    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
    this.props.chanageFilters(this.state.cost, this.state.start_date, this.state.end_date)
  }

  handleCostFromChange(event) {
    const costFrom = parseInt(event.target.value);
    var costTo = parseInt(this.state.costTo);

    if (costTo <= costFrom) {
      costTo = costFrom + 1000;
    }
    console.log(costFrom);
    console.log(costTo);
    console.log(costTo <= costFrom);
    this.setState({
      costTo,
      costFrom
    });
  }

  handleCostToChange(event) {
    const costTo = parseInt(event.target.value);
    var costFrom = parseInt(this.state.costFrom);

    if (costTo <= costFrom) {
      costFrom = costTo - 1000;
      if (costFrom < 0)
        costFrom = 0;
    }
    console.log(costFrom);
    console.log(costTo);
    this.setState({
      costTo,
      costFrom
    });
  }

  handleChangeStartDate(date){
    this.setState({
      start_date: date
    })
    this.props.chanageFilters(this.state.cost, date, this.state.end_date)
  }
  handleChangeEndDate(date){
    this.setState({
      end_date: date
    });
    this.props.chanageFilters(this.state.cost, this.state.start_date, date)
  }

  render() {
    var end = moment(this.state.end_date);

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
                  minDate={moment()}
                  maxDate={end}
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
            <p>Cost range:</p>
            <p>From</p>
            <input name="cost" type = "number" value = {s.costFrom} onChange = {this.handleCostFromChange}/>
            <p>To</p>
            <input name="cost" type = "number" value = {s.costTo} onChange = {this.handleCostToChange}/>
          </label>

          <div className="divider"></div>
          <div>
            <div className="title">Tags:</div>
            <div className="tags row">
              {p.tags}
            </div>
          </div>


        <button onClick = {() => this.props.clearFilters()}>clear filters</button>
      </div>
    )
  }
}
