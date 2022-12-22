import React, { Component } from "react";

class Searchbar extends Component {
    state = {
        inputValue: ''
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.inputValue) return;
        this.props.onSubmit(this.state);
    }
    onChange = (e) => {
        this.setState({
            inputValue: e.currentTarget.value

        })
    }
    render() {
        return <form onSubmit={this.onSubmit}>
            <input type="text" value={this.state.inputValue} onChange={this.onChange} />
            <button type="submit">%</button>
        </form>
    }
}


export default Searchbar;