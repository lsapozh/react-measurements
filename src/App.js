import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import {MEASUREMENT_TYPES} from 'constants/types';
import NewRecordModal from 'components/NewRecordModal';
import MeasurementChart from 'components/MeasurementChart';
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";
import EditRecordModal from "./components/EditRecordModal";

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
        editRecordModalOpen: false,
        editRecordId: 0,
        recordForEdit: {},
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
        const newRecord = values;
        newRecord.date = new Date();
        this.setState({
            records: [...this.state.records, newRecord]
        })
    };

    formatDate = (d) => {
        return d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : ''
    }

    makeDeleteRecord = (index) => (e) => {
        const indexToDelete = this.state.records.length - index - 1;
        const newRecords = [...this.state.records.slice(0, indexToDelete), ...this.state.records.slice(indexToDelete + 1, this.state.records.length)]
        this.setState({
            records: newRecords
        })
    }

    makeEditRecordModal = (id) => (e) => {
        const indexEdit = this.state.records.length - id - 1;
        // console.log(indexEdit, this.state.records, this.state.records[indexEdit]);
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
    }

    editRecord = (value) => {
        this.setState({
            editRecordModalOpen: false,
        });
        const editedRecord = value;
        const id = this.state.editRecordId;
        this.setState({
            records: [...this.state.records.slice(0, id), editedRecord, ...this.state.records.slice(id + 1, this.state.records.length)]
        })
    }


    render() {
        return (
            <div className="app">
                <div className="chartWrapper">
                    <MeasurementChart records={this.state.records} measurement="weight"/>
                </div>
                <div className="measurementsTableWrapper">
                    <div>{[...this.state.records].reverse().map((record, index) => {
                        return (
                            <div key={index}>
                                <h4>
                                    {this.formatDate(record.date)}
                                </h4>
                                <DeleteButton onClick={this.makeDeleteRecord(index)}>Delete</DeleteButton>

                                <EditButton onClick={this.makeEditRecordModal(index)}>Edit</EditButton>
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
                            </div>
                        );

                    })}
                    </div>


                </div>
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
