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
  background-color: #f2f2f2;
  padding: 20px;
  color: rgba(0, 0, 0, 0.85);
`;

const ModalActions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  button {
   
  }
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
`;

const CancelButton = styled(Button)`
  margin-right: 10px;
  background-color: rgba(139, 139, 139, 0.5);
  color: rgba(0, 0, 0, 0.8);
  border-color: rgba(139, 139, 139, 0); 
`;

const CreateButton = styled(Button)`
  background-color: #008b8bad;
  color: rgba(0, 0, 0, 0.8);
  border-color: #008b8b00; 
`;

const TypesDiv = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

const TypeDiv = styled.div`
   margin-bottom: 5px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   input {
      height: 30px;
      width: 50px;
      font-size: 16px;
      text-align: right;
   }
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 17px;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, 0.8);
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
            <Title>Add New Record</Title>
            <TypesDiv>
              {MEASUREMENT_TYPES.map((type, index) => {
                return (
                  <TypeDiv key={index}>
                    <label>
                      {type.name}
                    </label>
                    <input
                        type="number" name={type.value} value={this.state.value[type.value]}
                        onChange={this.createOnChange(type.value)}
                    />
                  </TypeDiv>
                );
              })}
            </TypesDiv>
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
