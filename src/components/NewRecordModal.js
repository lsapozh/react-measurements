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
  background-color: rgba(0, 0, 0, 0.4);
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
  font-size: 20px;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 5px;
`;

const CancelButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0.5);
`;

const CreateButton = styled(Button)`
  background-color: green;
  color: white;  
`;

export default class NewRecordModal extends Component {
  emptyValues = MEASUREMENT_TYPES.reduce((acc, type) => {
    acc[type.value] = '';
    return acc;
  }, {});

  state = {
    value: this.emptyValues,
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({
      value: this.emptyValues,
    });
  };

  createOnChange = (measurementName) => (event) => {
    this.setState({
      value: { ...this.state.value, [measurementName]: event.target.value },
    });
  };

  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <ModalBackdrop>
        <ModalBody>
          <form onSubmit={this.submitForm}>
            <h1>Add New Record</h1>
            <div>
              {MEASUREMENT_TYPES.map((type, index) => {
                return (
                  <div key={index}>
                    <label>
                      {type.name}
                      <br />
                      <input
                        type="number" name={type.value} value={this.state.value[type.value]}
                        onChange={this.createOnChange(type.value)}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            <ModalActions>
              <CancelButton onClick={this.props.onClose}>Cancel</CancelButton>
              <CreateButton>Create</CreateButton>
            </ModalActions>
          </form>
        </ModalBody>
      </ModalBackdrop>
    );
  }
}
