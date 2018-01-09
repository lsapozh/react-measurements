import React, { Component } from 'react'

export default class DeleteButton extends Component {
    render() {
        return (
            <button {...this.props}>{this.props.children}</button>
        )
    }
}