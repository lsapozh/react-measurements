import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import {MEASUREMENT_TYPES} from 'constants/types';
import {MEASUREMENT_PERIODS} from 'constants/periods';
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
   top: 0;
   margin: 10px auto 10px auto;
   background-color: rgba(139, 139, 139, 0.1);
   color: rgba(0, 0, 0, 0.7);
`;

const MeasurementDiv = styled.div`
    display: none;
    font-size: 17px;
    font-weight: 500;
    //width: 14.1%;
    width: 100%;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    ${({ active }) => active && "background-color: #008b8bad"};
    ${({ active }) => active && "display: inline-block"};
    // ${({ active }) => active && this.hideNotSelectedTypes}; 
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


const TimesDiv = styled.div`
    margin: 10px 15px 10px 15px;
    background-color: rgba(139, 139, 139, 0.1);
    color: rgba(0, 0, 0, 0.7);
   
`;

const TimeDiv = styled.div`
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    width: 33%;
    //border: 0.5px solid rgba(0, 0, 0, 0.05);
    border-left: 0.5px solid rgba(0, 0, 0, 0.05);
    border-right: 0.5px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    margin-bottom: 5px;
    ${({ active }) => active && "background-color: #008b8bad"};
    cursor: pointer;
`;

const ShowMeasurementsButton = styled.button`
    position: absolute;
    top: 18px;
    right: 15px;
    width: 40px;
    height: 40px;
    font-size: 20px;
    background-color: #008b8b00;
    border: #008b8b00;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
    
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
        this.setState({
            selectedMeasurement: type.value
        }, () => {
            this.findAndSetMeasurementValues();
            this.hideNotSelectedTypes(type);

        })
    };

    makeSelectTime = (period) => (e) => {
        this.setState({
            selectedTime: period
        })
    };

    showMeasurementTypes = () => {
        let divs = Array.prototype.slice.call(document.getElementsByClassName("MeasurementDiv"));
        divs.forEach((div) => {
            div.style.display = "inline-block";
        })
    };

    hideNotSelectedTypes = (type) => {
        const collection = document.getElementsByClassName("MeasurementDiv");
        const divs = Array.prototype.slice.call(collection);
        for (let i = 0; i < divs.length; i++) {
            if(divs[i].textContent !== type.name) {
                collection.item(i).style.display = 'none';
            }
        }

    };

    render() {
        return (
            <div className="app">
                <ShowMeasurementsButton onClick={this.showMeasurementTypes}>
                    {/*<i class="fa fa-sort-desc" aria-hidden="true"></i>*/}
                    <i className="fa fa-list" aria-hidden="true"></i>
                    {/*<i class="fa fa-chevron-down" aria-hidden="true"></i>*/}
                </ShowMeasurementsButton>
                <MeasurementTypesDiv>
                    {MEASUREMENT_TYPES.map((type, index) => {
                        return (
                            <MeasurementDiv
                                className="MeasurementDiv"
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

                <TimesDiv>
                    {MEASUREMENT_PERIODS.map((period, index) => {
                        return (
                            <TimeDiv
                                key={index}
                                active={this.state.selectedTime === period.value}
                                onClick={this.makeSelectTime(period.value)}
                            >
                                <p>
                                    {period.name}
                                </p>
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
