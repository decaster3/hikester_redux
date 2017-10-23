import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import FontAwesome from 'react-fontawesome';

export default class EventSearchingFiltersComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: '',
      cost: '',
      start_date: moment().set({'hour': 0, 'minute': 0}),
      end_date: moment().add(1, 'month'),
      costFrom: 0,
      costTo: 1000,
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleCostFromChange = this.handleCostFromChange.bind(this);
    this.handleCostToChange = this.handleCostToChange.bind(this);
  }
////
  handleChangeName(event){

    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
    this.props.chanageFilters(this.state.start_date, this.state.end_date)
    this.props.updateNameFilters(event.target.value)
  }

  handleCostFromChange(event) {

    const costFrom = parseInt(event.target.value.length == 0 ? 0 : event.target.value);
    var costTo = parseInt(this.state.costTo);

    if (costTo <= costFrom) {
      costTo = costFrom + 1000;
    }
    this.setState({
      costTo,
      costFrom
    });
    this.props.updateCostFilters(costFrom, costTo)
  }

  handleCostToChange(event) {
    const costTo = parseInt(event.target.value.length == 0 ? 0 : event.target.value);


    var costFrom = parseInt(this.state.costFrom);

    if (costTo <= costFrom) {
      costFrom = costTo - 1000;
      if (costFrom < 0)
        costFrom = 0;
    }
    this.setState({
      costTo,
      costFrom
    });
    this.props.updateCostFilters(costFrom, costTo)
  }

  handleChangeStartDate(date){
    this.setState({
      start_date: date
    })
    this.props.chanageFilters(date, this.state.end_date)
  }
  handleChangeEndDate(date){
    this.setState({
      end_date: date
    });
    this.props.chanageFilters(this.state.start_date, date)
  }

  render() {
    var end = moment(this.state.end_date);

    let s = this.state
    let p = this.props
    return(
      <div className="p-3">
          <input
            name="name"
            type="text"
            className="input-text"
            placeholder="Event Name.."
            onChange={this.handleChangeName}/>

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
                  minDate={s.start_date}
                />
                <FontAwesome name="calendar" className="input-date-icon" />
              </div>
            </div>
          </div>

          <div className="mt-3">Cost range:</div>
          <div className="row mt-1">
            <div className="col">
              <div className="input-date-group">
                From:
                <input name="cost" type = "number"  value = {s.costFrom} onChange = {this.handleCostFromChange}/>
              </div>
            </div>
            <div className="col">
              <div className="input-date-group">
                To:
                <input name="cost" type = "number"  value = {s.costTo} onChange = {this.handleCostToChange}/>
              </div>
            </div>
          </div>

          <div className="divider"></div>
          <div>
            <div className="title">Tag:</div>
            <div className="tags row">
              {p.tags}
            </div>
          </div>


        <button className="button mt-3" onClick = {() => this.props.clearFilters()}>Clear filters</button>
      </div>
    )
  }
}
