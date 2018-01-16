import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import {MEASUREMENT_TYPES} from 'constants/types';
import NewRecordModal from 'components/NewRecordModal';
import MeasurementChart from 'components/MeasurementChart';
import EditRecordModal from "./components/EditRecordModal";
import seedRecords from "./constants/seedRecords";

const AddNewRecord = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background-color: lightcoral;
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

const RecordsDiv = styled.div`
  position: relative;
  margin: 10px 15px 50px 15px;
  color: rgba(0, 0, 0, 0.8);
`;

const RecordDiv = styled.div`
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    margin: 10px auto 10px auto;
    background-color: rgba(139, 139, 139, 0.05);
`;

const RecordInfoDiv = styled.div`
    display: inline-block;
    position: relative;
    width: 30%;
    vertical-align: top;
    margin-left: 15px;
    font-size: 14px;
    
`;

const RecordButtonsDiv = styled.div`
    display: inline-block;
    position: relative;
    float: right;
    vertical-align: top;
    width: 20%;
`;

const DeleteButton = styled.button`
    float: right;
    width: 100%;
    margin: 0px 15px 15px 0;
    padding: 5px 0 5px 0;
    font-size: 14px;
    background-color: rgba(139, 139, 139, 0.5);
    color: rgba(0, 0, 0, 0.8);
`;

const EditButton = styled.button`
    float: right;
    width: 100%;
    margin: 15px 15px 10px 0;
    padding: 5px 0 5px 0;
    font-size: 14px;
    background-color: rgba(0, 139, 139, 1);
    // color: white;
    color: rgba(0, 0, 0, 0.8);
`;

const Clear = styled.div`
    clear: both;
`;

const MeasurementTypesDiv = styled.div`
   //width: 100%;
   margin: 10px auto 10px auto;
   background-color: rgba(139, 139, 139, 0.1);
   color: rgba(0, 0, 0, 0.7);
`;

const MeasurementDiv = styled.div`
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    width: 14.1%;
    border: 0.5px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    ${({ active }) => active && "background-color: #008b8bad"};
    cursor: pointer;
`;

const MeasurementValuesDiv = styled.div`
    text-align: center;
    margin: 15px 15px 15px 15px;
    color: rgba(0, 0, 0, 0.7);
`;

const MeasurementValuesName = styled.div`
    display: inline-block;
    width: 33%;
`;

const MeasurementValue = styled.div`
    margin-top: 10px;
    font-size: 25px;   
    color: darkcyan;
    font-weight: 700;
`;




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
        changes: 0

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
    //
    // componentDidCatch(error, info) {
    //     console.log(error, info);
    // }

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
                this.setState({
                    startValue: this.state.records[0][this.state.selectedMeasurement],
                    currentValue: this.state.records[this.state.records.length - 1][this.state.selectedMeasurement],
                }, () => {
                    this.setState({
                        changes: this.state.currentValue - this.state.startValue
                    })
                })
            })
        }
    }

    saveToLocalStorage = () => {
        localStorage.setItem("records", JSON.stringify(this.state.records));
    };

    makeSelectMeasurement = (type) => (e) => {
        this.setState({
            selectedMeasurement: type.value
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
    }

    render() {
        return (
            <div className="app">
                <MeasurementTypesDiv>
                    {MEASUREMENT_TYPES.map((type, index) => {
                        return (
                            <MeasurementDiv
                                key={index}
                                active={this.state.selectedMeasurement === type.value}
                                onClick={this.makeSelectMeasurement(type)}
                            >
                                <p>
                                    {type.name}
                                </p>
                            </MeasurementDiv>
                        );
                    })}
                </MeasurementTypesDiv>

                <select>
                    <option>all time</option>
                    <option>last month</option>
                    <option>last week</option>
                </select>

                <MeasurementChart records={this.state.records} measurement={this.state.selectedMeasurement}/>

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
