import React, { Component } from "react";
import { Header, Button, Input, Form } from "./Searchbar.styled";
class Searchbar extends Component {
    state = {
        inputValue: ''
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.inputValue.trim()) return;
        this.props.onSubmit(this.state);
    }
    onChange = (e) => {
        this.setState({
            inputValue: e.currentTarget.value

        })
    }
    render() {
        return <Header><Form onSubmit={this.onSubmit}>
            <Input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.inputValue} onChange={this.onChange}
            />
            <Button type="submit"></Button>
        </Form></Header>
    }
}


export default Searchbar;