import Searchbar from "./Searchbar/Searchbar";
import React, { Component } from "react";
import { fetchImages } from "./fetch";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
class App extends Component {
  state = {
    data: [],
    status: ''
  }
  page = 1;
  per_page = 12;
  onSubmit = (data) => {
    fetchImages(data.inputValue, this.page, this.per_page).then(({ data }) => {
      this.setState({
        data: data.hits,
        status: "rejected"
      })
    });
  }
  onClick = (e) => {
    this.setState({
      data: e,
      status: "idle"
    })
  }
  render() {
    return <div><Searchbar onSubmit={this.onSubmit} />
      {this.state.status === "rejected" && <ImageGallery options={this.state.data} onClick={this.onClick} />}
      {this.state.status === "idle" && <Modal options={this.state.data} />}
    </div>
  }
}

export default App;