import React, { Component } from 'react';
import styled from 'styled-components';
import { MEASUREMENT_TYPES } from 'constants/types';

const ModalBackdrop = styled.div`
  z-index: 1000;
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  background-color: #efefef;
  padding: 20px;
`;

const ModalActions = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid black;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

const Button = styled.button`
  font-size: 14px;
  // border: 1px solid black;
  padding: 10px 20px;
  // border-radius: 5px;
`;

const CancelButton = styled(Button)`
  background-color: rgba(139, 139, 139, 0.5);
  // border-color: rgba(0, 0, 0, 0.5);
`;

const EditButton = styled(Button)`
  background-color: rgba(0, 139, 139, 1);
  // color: white;  
`;

const TypesDiv = styled.div`
  font-size: 14px;
`;

const TypeDiv = styled.div`
   margin-bottom: 5px;
`;

export default class NewRecordModal extends Component {

    state = {
        value: this.props.record
    };

    submitForm = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
    };

    createOnChange = (measurementName) => (event) => {
        this.setState({
            value: { ...this.state.value, [measurementName]: event.target.value },
        });
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.record !== nextProps.record) {
            this.setState({
                value: nextProps.record
            })
        }
    }

    render() {
        if (!this.props.open) {
            return null;
        }
        return (
            <ModalBackdrop>
                <ModalBody>
                    <form onSubmit={this.submitForm}>
                        <h1>Edit Record</h1>
                        <TypesDiv>
                            {MEASUREMENT_TYPES.map((type, index) => {
                                return (
                                    <TypeDiv key={index}>
                                        <label>
                                            {type.name}
                                            <br />
                                            <input
                                                type="number" name={type.value} value={this.state.value[type.value] || ''}
                                                onChange={this.createOnChange(type.value)}
                                            />
                                        </label>
                                    </TypeDiv>
                                );
                            })}
                        </TypesDiv>
                        <ModalActions>
                            <CancelButton onClick={this.props.onClose}>Cancel</CancelButton>
                            <EditButton>Update</EditButton>
                        </ModalActions>
                    </form>
                </ModalBody>
            </ModalBackdrop>
        );
    }
}
