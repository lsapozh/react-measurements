import React, {Component} from 'react';
import styled from 'styled-components';
import {MEASUREMENT_TYPES} from 'constants/types';
import {ShowMeasurementsIcon} from "./icons";


const MeasurementTypesDiv = styled.div`
   top: 0;
   margin: 10px auto 10px auto;
   background-color: rgba(139, 139, 139, 0.1);
   color: rgba(0, 0, 0, 0.7);
`;

const MeasurementDiv = styled.div`
    font-size: 17px;
    font-weight: 500;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    i {
      color: rgba(0, 0, 0, 0.7);
    }
    ${({ active }) => active && "background-color: #57acad"};
    ${({ active }) => active && "color: white"};
    ${({ active }) => active && "i { color: white; } "};
    cursor: pointer;
`;

export default class MeasurementTypes extends Component {
    render() {
        return (
            <MeasurementTypesDiv>
                {MEASUREMENT_TYPES.filter((type) => (this.props.selectedMeasurement === type.value) || this.props.showMeasurementTypes).map((type, index) => {
                    return (
                        <MeasurementDiv
                            key={index}
                            active={this.props.selectedMeasurement === type.value}
                            onClick={this.props.onClick(type)}
                        >
                            <span>{type.name}</span>
                            { index === 0 && (
                                <ShowMeasurementsIcon>
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </ShowMeasurementsIcon>
                            )}
                        </MeasurementDiv>
                    );
                })}
            </MeasurementTypesDiv>
        )
    }
}