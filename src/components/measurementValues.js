import React, {Component} from 'react';
import styled from 'styled-components';


const MeasurementValuesDiv = styled.div`
    text-align: center;
    height: 30px;
    margin: 15px 15px 35px 15px;
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

export default class MeasurementValues extends Component {
    render() {
        return (
            <MeasurementValuesDiv>
                <MeasurementValuesName>start:
                    <MeasurementValue>{this.props.startValue}</MeasurementValue>
                </MeasurementValuesName>

                <MeasurementValuesName>now:
                    <MeasurementValue>{this.props.currentValue}</MeasurementValue>
                </MeasurementValuesName>

                <MeasurementValuesName>changes:
                    <MeasurementValue>{this.props.changes}</MeasurementValue>
                </MeasurementValuesName>
            </MeasurementValuesDiv>
        )

    }
}

