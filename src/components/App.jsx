import Searchbar from "./Searchbar/Searchbar";
import React, { Component } from "react";
import { fetchImages } from "./fetch";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Notification } from "./Notification/Notification";
import { AppContainer } from "./App.styled";
class App extends Component {
  state = {
    data: [],
    status: '',
    loading: false,
    inputValue: '',
    modal: [],
  }
  page = 1;
  per_page = 12;
  onSubmit = (data) => {
    this.page = 1;
    this.setState({
      data: [],
      inputValue: data.inputValue,
      status: "pending",
      loading: false
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
          status: "error"
        })
      }
    });
  }
  onClick = (e) => {
    this.setState({
      modal: e,
    })
  }
  onExitEsc = (e) => {
    if (e.code === "Escape") {
      this.setState({
        modal: [],
      })
    }
  }
  componentDidUpdate() {
    if (this.state.modal.length > 0) {
      window.addEventListener("keydown", this.onExitEsc);
    } else {
      window.removeEventListener("keydown", this.onExitEsc);
    }
  }
  plavno = () => {
    const { height: cardHeight } = document
      .querySelector(".css-6gimhd")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth"
    });
  }
  onClickLoadMore = (e) => {
    this.page++;
    this.setState({
      status: "pending",
      loading: false,
    })
    fetchImages(this.state.inputValue, this.page, this.per_page).then(({ data }) => {
      this.plavno();
      if (data.hits.length < this.per_page) {
        this.setState({
          status: "resolved",
          loading: false,
        })
      } else {
        this.setState({
          status: "rejected",
          loading: true,
        })
      }
      return this.setState(prevState => ({
        data: [...prevState.data, ...data.hits]
      }))
    })

  }
  onClickOverlay = (e) => {
    if (e.target.nodeName === "IMG") return;
    return this.setState({
      modal: []
    })
  }
  render() {
    const { data, modal, loading, status } = this.state;
    return (<AppContainer><Searchbar onSubmit={this.onSubmit} />
      {data.length > 0 && <ImageGallery images={this.state.data} onClick={this.onClick} />}
      {modal.length > 0 && <Modal image={this.state.modal} onClickOverlay={this.onClickOverlay} />}
      {loading === true && <Button onClickLoadMore={this.onClickLoadMore} />}
      {status === "pending" && <Loader />}
      {status === "error" && <Notification message="No data!! Please enter valid value" />}
      {status === "resolved" && <Notification message="End of List" />}
    </AppContainer>)
  }
}

export default App;