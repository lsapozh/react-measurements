// https://firebase.google.com/docs/firestore/quickstart
// https://firebase.google.com/docs/firestore/query-data/get-data

import React, {Component} from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import './App.css';
import {MEASUREMENT_TYPES} from 'constants/types';
import NewRecordModal from 'components/Modals/NewRecordModal';
import MeasurementChart from 'components/MeasurementChart';
import EditRecordModal from "./components/Modals/EditRecordModal";
import seedRecords from "./constants/seedRecords";
import {AddNewRecord} from "./components/addNewRecord";
import MeasurementValues from "./components/measurementValues";
import Periods from "./components/periods";
import MeasurementTypes from "./components/measurementTypes";
import Records from "./components/recordsDiv/recordsDiv";


class App extends Component {
    static propTypes = {
      db: PropTypes.object.isRequired
    };

    state = {
        isLoading: true,
        newRecordModalOpened: false,
        editRecordModalOpen: false,
        editRecordId: 0,
        recordForEdit: {},
        records: [],
        selectedMeasurement: MEASUREMENT_TYPES[0].value,
        startValue: 0,
        currentValue: 0,
        changes: 0,
        selectedTime: "last_month"

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

    addNewRecordToDatabase = (newRecord) => {
        this.props.db.collection("measurements").add(newRecord);
    };

    updateRecordToDatabase = (numberOfRecord, record) => {
        let id = this.state.records[numberOfRecord].id;
        this.props.db.collection("measurements").doc(id).set(record);
    };



    createNewRecord = (values) => {
        this.setState({
            newRecordModalOpened: false,
        });
        const newRecord = values;
        const newDate = new Date();
        newRecord.date = newDate;
        let dates = this.state.records.map((record) => {
            return this.formatDate(record.date);
        });

        if (dates.includes(this.formatDate(newDate))) {
            let numberOfRecord = dates.indexOf(this.formatDate(newDate));
            this.updateRecordToDatabase(numberOfRecord, newRecord);
        } else {
            this.addNewRecordToDatabase(newRecord);
        }

    };

    formatDate = (d) => {
        return d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : ''
    };

    makeDeleteRecord = (index) => (e) => {
        const numberOfRecord = this.state.records.length - index - 1;
        const id = this.state.records[numberOfRecord].id;
        this.props.db.collection("measurements").doc(id).delete();

    };

    makeEditRecordModal = (id) => (e) => {
        const indexEdit = this.state.records.length - id - 1;
        const currentRecord = this.state.records[indexEdit];
        this.setState({
            recordForEdit: currentRecord,
            editRecordModalOpen: true,
            editRecordId: indexEdit
        });
    };


    closeEditRecordModal = () => {
        this.setState({
            editRecordModalOpen: false,
        });
    };

    editRecord = (value) => {
        this.setState({
            editRecordModalOpen: false,
        });
        const numberOfRecord = this.state.editRecordId;
        this.updateRecordToDatabase(numberOfRecord, value);

    };


    componentWillMount(){
        this.props.db.collection("measurements").orderBy("date").onSnapshot((query) => {
          const records = [];
          query.forEach((r) => {
              const data = r.data();
              data.id = r.id;
              records.push(data);
          });
          this.setState({
            records,
            isLoading: false
          }, () => {
            const records = this.state.records;
            this.setState({
                startValue: records.length > 0 ? records[0][this.state.selectedMeasurement] : 0,
                currentValue: records.length > 0 ? records[records.length - 1][this.state.selectedMeasurement] : 0,
            }, () => {
                let diff = this.state.currentValue - this.state.startValue;
                if (diff) {
                    this.setState({
                        changes: diff
                    })
                } else {
                    this.setState({
                        changes: ""
                    })
                }
            })
          });
        })
    }

    findAndSetMeasurementValues = () => {
        let start = 0;
        let end = 0;
        for (let i = 0; i < this.state.records.length; i++) {
            if (this.state.records[i][this.state.selectedMeasurement]) {
                start = i;
                break;
            }
        }

        for (let i = this.state.records.length - 1; i >= 0; i--) {
            if (this.state.records[i][this.state.selectedMeasurement]) {
                end = i;
                break;
            }
        }
        this.setState({
            startValue: this.state.records[start][this.state.selectedMeasurement],
            currentValue: this.state.records[end][this.state.selectedMeasurement],
        }, () => {
            let diff = this.state.currentValue - this.state.startValue;
            if (diff) {
                this.setState({
                    changes: diff
                })
            } else {
                this.setState({
                    changes: ""
                })
            }
        })
    };

    makeSelectMeasurement = (type) => (e) => {
        if (this.state.showMeasurementTypes) {
            this.setState({
                selectedMeasurement: type.value,
                showMeasurementTypes: false
            }, this.findAndSetMeasurementValues)
        } else {
            this.setState({
                showMeasurementTypes: true
            })
        }
    };

    makeSelectTime = (period) => (e) => {
        this.setState({
            selectedTime: period
        })
    };

    showMeasurementTypes = () => {
        this.setState({
            showMeasurementTypes: true
        })
    };

    renderLoader = () => (
      <div>Loading...</div>
    );

    render() {
        return (
            <div className="app">
                <MeasurementTypes selectedMeasurement={this.state.selectedMeasurement} showMeasurementTypes={this.state.showMeasurementTypes} onClick={this.makeSelectMeasurement}/>

                <Periods selectedTime={this.state.selectedTime} onClick={this.makeSelectTime}/>

                <MeasurementValues startValue={this.state.startValue} currentValue={this.state.currentValue} changes={this.state.changes}></MeasurementValues>

                <MeasurementChart records={this.state.records} measurement={this.state.selectedMeasurement} time={this.state.selectedTime}/>

              { this.state.isLoading && this.renderLoader() }
              { !this.state.isLoading && <Records records={this.state.records} formatDate={this.formatDate} makeEditRecordModal={this.makeEditRecordModal} makeDeleteRecord={this.makeDeleteRecord}/> }

                <EditRecordModal record={this.state.recordForEdit} open={this.state.editRecordModalOpen} onClose={this.closeEditRecordModal}
                                 onSubmit={this.editRecord}/>
                <NewRecordModal open={this.state.newRecordModalOpened} onClose={this.closeNewRecordModal}
                                onSubmit={this.createNewRecord}/>
                <AddNewRecord className="newRecordButton" onClick={this.openNewRecordModal}>
                    Add New Record
                </AddNewRecord>
            </div>
        );
    }
}

export default App;
