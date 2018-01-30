import React, {Component} from 'react';
import './App.css';
import {MEASUREMENT_TYPES} from 'constants/types';
import {MEASUREMENT_PERIODS} from 'constants/periods';
import NewRecordModal from 'components/Modals/NewRecordModal';
import MeasurementChart from 'components/MeasurementChart';
import EditRecordModal from "./components/Modals/EditRecordModal";
import seedRecords from "./constants/seedRecords";
import {AddNewRecord} from "./components/addNewRecord";
import {Clear} from "./components/clearBoth";
import {RecordDiv, RecordsDiv} from "./components/recordsDiv/recordsDiv";
import {RecordInfoDiv} from "./components/recordsDiv/recordInfoDiv";
import {RecordButtonsDiv} from "./components/recordsDiv/recordButtons/recordButtonsDiv";
import {EditButton} from "./components/recordsDiv/recordButtons/EditButton";
import {DeleteButton} from "./components/recordsDiv/recordButtons/DeleteButton";
import {ShowMeasurementsIcon} from "./components/icons";
import {TimeDiv, TimesDiv} from "./components/periods";
import {MeasurementDiv, MeasurementTypesDiv} from "./components/measurementTypes";
import {MeasurementValue, MeasurementValuesDiv, MeasurementValuesName} from "./components/recordsDiv/measurementValues";

class App extends Component {
    state = {
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
            let id = dates.indexOf(this.formatDate(newDate));
            console.log(id);
            this.setState({
                records: [...this.state.records.slice(0, id), newRecord, ...this.state.records.slice(id + 1, this.state.records.length)]
            }, () => this.saveToLocalStorage())
        } else {
            this.setState({
                records: [...this.state.records, newRecord]
            }, () => this.saveToLocalStorage())
        }

    };

    formatDate = (d) => {
        return d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : ''
    };

    makeDeleteRecord = (index) => (e) => {
        const indexToDelete = this.state.records.length - index - 1;
        const newRecords = [...this.state.records.slice(0, indexToDelete), ...this.state.records.slice(indexToDelete + 1, this.state.records.length)]
        this.setState({
            records: newRecords
        }, () => this.saveToLocalStorage())
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
        const editedRecord = value;
        const id = this.state.editRecordId;
        this.setState({
            records: [...this.state.records.slice(0, id), editedRecord, ...this.state.records.slice(id + 1, this.state.records.length)]
        }, () => this.saveToLocalStorage())

    };


    componentWillMount(){
        // localStorage.clear();
        if (localStorage.getItem("records")) {
            let items = JSON.parse(localStorage.getItem("records"));
            items.forEach((record) => {
                record.date = new Date(record.date);
            });
            this.setState({
                records: items
            }, () => {
                this.setState({
                    startValue: this.state.records[0][this.state.selectedMeasurement],
                    currentValue: this.state.records[this.state.records.length - 1][this.state.selectedMeasurement],
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
            })
        } else {
            this.setState({
                records: seedRecords
            }, () => {
                this.findAndSetMeasurementValues();
            })
        }
    }

    saveToLocalStorage = () => {
        localStorage.setItem("records", JSON.stringify(this.state.records));
    };


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
    }

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

    render() {
        return (
            <div className="app">
                <MeasurementTypesDiv>
                    {MEASUREMENT_TYPES.filter((type) => (this.state.selectedMeasurement === type.value) || this.state.showMeasurementTypes).map((type, index) => {
                        return (
                            <MeasurementDiv
                                key={index}
                                active={this.state.selectedMeasurement === type.value}
                                onClick={this.makeSelectMeasurement(type)}
                            >
                                <span>{type.name}</span>
                                { index === 0 && (
                                    <ShowMeasurementsIcon>
                                        <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                    </ShowMeasurementsIcon>
                                )}
                            </MeasurementDiv>
                        );
                    })}
                </MeasurementTypesDiv>

                <TimesDiv>
                    {MEASUREMENT_PERIODS.map((period, index) => {
                        return (
                            <TimeDiv
                                key={index}
                                active={this.state.selectedTime === period.value}
                                onClick={this.makeSelectTime(period.value)}
                            >
                                    <span>{period.name}</span>
                            </TimeDiv>
                        );
                    })}
                </TimesDiv>

                <MeasurementValuesDiv>
                    <MeasurementValuesName>start:
                        <MeasurementValue>{this.state.startValue}</MeasurementValue>
                    </MeasurementValuesName>

                    <MeasurementValuesName>now:
                        <MeasurementValue>{this.state.currentValue}</MeasurementValue>
                    </MeasurementValuesName>

                    <MeasurementValuesName>changes:
                        <MeasurementValue>{this.state.changes}</MeasurementValue>
                    </MeasurementValuesName>
                </MeasurementValuesDiv>

                <MeasurementChart records={this.state.records} measurement={this.state.selectedMeasurement} time={this.state.selectedTime}/>


                <RecordsDiv className="measurementsTableWrapper">{[...this.state.records].reverse().map((record, index) => {
                    return (
                        <RecordDiv key={index}>
                            <RecordInfoDiv>
                                <h4>
                                    {this.formatDate(record.date)}
                                </h4>
                                {MEASUREMENT_TYPES.map((type, index) => {
                                    if (record[type.value]) return (
                                        <div key={index}>
                                            <p>
                                                {type.name + ": " + record[type.value]}
                                            </p>
                                        </div>
                                    );
                                    return null;
                                })}
                            </RecordInfoDiv>
                            <RecordButtonsDiv>
                                <EditButton onClick={this.makeEditRecordModal(index)}>Edit</EditButton>
                                <DeleteButton onClick={this.makeDeleteRecord(index)}>Delete</DeleteButton>
                            </RecordButtonsDiv>
                            <Clear></Clear>
                        </RecordDiv>
                    );

                })}
                </RecordsDiv>

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
