import React, { Component } from 'react'

export default class EditButton extends Component {
    render() {
        return (
            <button {...this.props}>{this.props.children}</button>
        )
    }
}