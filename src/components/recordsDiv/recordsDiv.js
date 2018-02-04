import React, {Component} from 'react';
import styled from 'styled-components';
import {MEASUREMENT_TYPES} from 'constants/types';
import {RecordInfoDiv} from "./recordInfoDiv";
import {RecordButtonsDiv} from "./recordButtons/recordButtonsDiv";
import {EditButton} from "./recordButtons/EditButton";
import {DeleteButton} from "./recordButtons/DeleteButton";
import {Clear} from "../clearBoth";

const RecordDiv = styled.div`
    padding-top: 14px;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    margin: 10px auto 10px auto;
    background-color: rgba(139, 139, 139, 0.05);
    h4 {
      margin-top: 0;
    }
`;

const RecordsDiv = styled.div`
  position: relative;
  margin: 10px 15px 50px 15px;
  color: rgba(0, 0, 0, 0.8);
`;


export default class Records extends Component {
    render() {
        return (
            <RecordsDiv>{[...this.props.records].reverse().map((record, index) => {
                return (
                    <RecordDiv key={index}>
                        <RecordInfoDiv>
                            <h4>
                                {this.props.formatDate(record.date)}
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
                            <EditButton onClick={this.props.makeEditRecordModal(index)}>Edit</EditButton>
                            <DeleteButton onClick={this.props.makeDeleteRecord(index)}><i className="fa fa-times"></i></DeleteButton>
                        </RecordButtonsDiv>
                        <Clear></Clear>
                    </RecordDiv>
                );
            })}
            </RecordsDiv>



        )
    }
}