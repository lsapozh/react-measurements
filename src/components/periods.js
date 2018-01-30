import React, {Component} from 'react';
import styled from 'styled-components';
import {MEASUREMENT_PERIODS} from 'constants/periods';

const TimesDiv = styled.div`
    margin: 10px 15px 10px 15px;
    background-color: rgba(139, 139, 139, 0.1);
    color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    height: 30px;
    align-items: stretch;
    `;

const TimeDiv = styled.div`
    font-size: 11px;
    font-weight: 500;
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    border-left: 0.5px solid rgba(0, 0, 0, 0.05);
    border-right: 0.5px solid rgba(0, 0, 0, 0.05);
    ${({ active }) => active && "background-color: #008b8bad"};
    cursor: pointer;
`;

export default class Periods extends Component {
    render() {
        return (
            <TimesDiv>
                {MEASUREMENT_PERIODS.map((period, index) => {
                    return (
                        <TimeDiv
                            key={index}
                            active={this.props.selectedTime === period.value}
                            onClick={this.props.onClick(period.value)}
                        >
                            <span>{period.name}</span>
                        </TimeDiv>
                    );
                })}
            </TimesDiv>
        )
    }
}


