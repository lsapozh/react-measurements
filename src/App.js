import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { MEASUREMENT_TYPES } from 'constants/types';
import NewRecordModal from 'components/NewRecordModal';
import MeasurementChart from 'components/MeasurementChart';

const AddNewRecord = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background-color: red;
`;

class App extends Component {
  state = {
    newRecordModalOpened: false,
    records: [
      {
        date: new Date(2018, 0, 1),
        weight: 80,
      },
      {
        date: new Date(2018, 0, 2),
        weight: 21
      },
      {
        date: new Date(2018, 0, 3),
        weight: 30
      },
      {
        date: new Date(2018, 0, 6),
        weight: 60
      },
      {
        date: new Date(2018, 0, 8),
        weight: 50
      },
      {
        date: new Date(2018, 0, 9),
        weight: 30
      },
    ],
  };

  openNewRecordModal = () => {
    this.setState({
      newRecordModalOpened: true,
    });
  };

  closeNewRecordModal = () => {
    this.setState({
      newRecordModalOpened: false,
    });
  };

  createNewRecord = (values) => {
    this.setState({
      newRecordModalOpened: false,
    });
    const newRecord = values
    newRecord.date = new Date()
    this.setState({
      records: [...this.state.records, newRecord]
    })
  };

  formatDate = (d) => {
    return d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : ''
  }

  render() {
    return (
      <div className="app">
        <div className="chartWrapper">
          <MeasurementChart records={this.state.records} measurement="weight"/>
        </div>
        <div className="measurementsTableWrapper">
          <table>
            <thead>
            <tr>
              <th key="date">Date</th>
              {MEASUREMENT_TYPES.map((type, index) => {
                return (
                  <th key={index}>{type.name}</th>
                );
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.records.map((record, index) => {
              return (
                <tr key={index}>
                  <td key="date">{this.formatDate(record.date)}</td>
                  {MEASUREMENT_TYPES.map((type, index) => {
                    return (
                      <td key={index}>{record[type.value]}</td>
                    );
                  })}
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        <NewRecordModal open={this.state.newRecordModalOpened} onClose={this.closeNewRecordModal} onSubmit={this.createNewRecord}/>
        <AddNewRecord className="newRecordButton" onClick={this.openNewRecordModal}>
          Add New Record
        </AddNewRecord>
      </div>
    );
  }
}

export default App;
