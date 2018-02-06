import React, { Component } from 'react';
import { MEASUREMENT_TYPES } from 'constants/types';
import {ModalBackdrop, ModalBody, ModalActions, CancelButton, SubmitButton, TypesDiv, TypeDiv, Title} from 'components/Modals/components/components';

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
                        <Title>Edit Record</Title>
                        <TypesDiv>
                            {MEASUREMENT_TYPES.map((type, index) => {
                                return (
                                    <TypeDiv key={index}>
                                        <label>
                                            {type.name}
                                        </label>
                                        <input
                                            type="number" name={type.value} value={this.state.value[type.value] || ''}
                                            onChange={this.createOnChange(type.value)}
                                            step="0.1"
                                        />
                                    </TypeDiv>
                                );
                            })}
                        </TypesDiv>
                        <ModalActions>
                            <CancelButton onClick={this.props.onClose}>Cancel</CancelButton>
                            <SubmitButton>Update</SubmitButton>
                        </ModalActions>
                    </form>
                </ModalBody>
            </ModalBackdrop>
        );
    }
}
