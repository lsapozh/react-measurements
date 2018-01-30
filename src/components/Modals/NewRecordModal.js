import React, { Component } from 'react';
import { MEASUREMENT_TYPES } from 'constants/types';
import {ModalBackdrop, ModalBody, ModalActions, CancelButton, SubmitButton, TypesDiv, TypeDiv, Title} from 'components/Modals/components/components';


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
              <SubmitButton>Create</SubmitButton>
            </ModalActions>
          </form>
        </ModalBody>
      </ModalBackdrop>
    );
  }
}
