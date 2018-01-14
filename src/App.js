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
  // color: white;
`;

const RecordsDiv = styled.div`
  position: relative;
  margin: 10px 0 50px 0;
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
    
`;

const EditButton = styled.button`
    float: right;
    width: 100%;
    margin: 15px 15px 10px 0;
    padding: 5px 0 5px 0;
    font-size: 14px;
    background-color: rgba(0, 139, 139, 1);
    // color: white;
`;

const Clear = styled.div`
    clear: both;
`;

const MeasurementTypesDiv = styled.div`
   width: 100%;
   margin: 10px auto 10px auto;
   background-color: rgba(139, 139, 139, 0.1);
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


class App extends Component {
    state = {
        newRecordModalOpened: false,
        editRecordModalOpen: false,
        editRecordId: 0,
        recordForEdit: {},
        records: [],
        selectedMeasurement: MEASUREMENT_TYPES[0].value
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
            })
        } else {
            this.setState({
                records: seedRecords
            })
        }
    }

    saveToLocalStorage = () => {
        localStorage.setItem("records", JSON.stringify(this.state.records));
    };

    makeSelectMeasurement = (type) => (e) => {
        this.setState({
            selectedMeasurement: type.value
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
                <MeasurementChart records={this.state.records} measurement={this.state.selectedMeasurement}/>
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
