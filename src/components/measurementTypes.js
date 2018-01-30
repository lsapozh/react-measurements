import React, {Component} from 'react';
import styled from 'styled-components';

export const MeasurementTypesDiv = styled.div`
   top: 0;
   margin: 10px auto 10px auto;
   background-color: rgba(139, 139, 139, 0.1);
   color: rgba(0, 0, 0, 0.7);
`;

export const MeasurementDiv = styled.div`
    font-size: 17px;
    font-weight: 500;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    ${({ active }) => active && "background-color: #008b8bad"};
    cursor: pointer;
`;
