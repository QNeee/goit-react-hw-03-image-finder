import Searchbar from "./Searchbar/Searchbar";
import React, { Component } from "react";
import { fetchImages } from "./fetch";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";
class App extends Component {
  state = {
    data: [],
    status: '',
    loading: false,
    inputValue: ''
  }
  page = 1;
  per_page = 12;
  onSubmit = (data) => {
    this.page = 1;
    this.setState({
      data: [],
      inputValue: data.inputValue
    })
    fetchImages(data.inputValue, this.page, this.per_page).then(({ data }) => {
      if (data.totalHits > this.per_page) {
        this.setState({
          data: data.hits,
          status: "rejected",
          loading: true,
        })
      }
      if (data.totalHits === 0) {
        this.setState({
          loading: false
        })
      }
    });
  }
  onClick = (e) => {
    this.setState({
      data: e,
      status: "idle"
    })
  }
  onClickLoadMore = (e) => {
    this.page++;
    fetchImages(this.state.inputValue, this.page, this.per_page).then(({ data }) => {
      const totalPages = Math.ceil(data.totalHits / this.per_page);
      if (this.page > totalPages) {
        return this.setState({
          loading: false
        })
      }
      return this.setState(prevState => ({
        data: [...prevState.data, ...data.hits]
      }))


    })
  }

  render() {
    return <div><Searchbar onSubmit={this.onSubmit} />
      {this.state.status === "rejected" && <ImageGallery options={this.state.data} onClick={this.onClick} />}
      {this.state.status === "idle" && <Modal options={this.state.data} />}
      {this.state.loading === true && <Button onClickLoadMore={this.onClickLoadMore} />}
    </div>
  }
}

export default App;