import React, { Component } from 'react';
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
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

export const ModalBody = styled.div`
  background-color: #fafafa;
  padding: 20px;
  color: rgba(0, 0, 0, 0.9);
`;

export const ModalActions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
`;

export const CancelButton = styled(Button)`
  margin-right: 10px;
  background-color: rgba(139, 139, 139, 0.5);
  color: rgba(0, 0, 0, 0.8);
  border-color: rgba(139, 139, 139, 0); 
`;

export const SubmitButton = styled(Button)`
  background-color: #008b8bad;
  color: rgba(0, 0, 0, 0.8);
  border-color: #008b8b00; 
`;

export const TypesDiv = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

export const TypeDiv = styled.div`
   margin-bottom: 5px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   input {
      height: 30px;
      width: 50px;
      font-size: 16px;
      text-align: right;
      border-color: rgba(139, 139, 139, 0.5);
      border-width: 1px;
   }
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 17px;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, 0.8);
`;