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
      status: "pending"
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
          loading: false,
          status: "error"
        })
      }
      if (data.totalHits < this.per_page && data.totalHits !== 0) {
        this.setState({
          loading: false
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
      behavior: "smooth",
    });
  }
  onClickLoadMore = (e) => {
    this.page++;
    this.setState({
      status: "pending",
      loading: false,
    })
    fetchImages(this.state.inputValue, this.page, this.per_page).then(({ data }) => {
      const totalPages = Math.ceil(data.totalHits / this.per_page);
      this.plavno();
      if (this.page > totalPages) {
        return this.setState({
          loading: false,
          status: "resolved"
        })
      }
      return this.setState(prevState => ({
        data: [...prevState.data, ...data.hits],
        status: "rejected",
        loading: true,
      }))

    })

  }

  render() {
    const { data, modal, loading, status } = this.state;
    return (<AppContainer onKeyDown={this.onClickKeyDown}><Searchbar onSubmit={this.onSubmit} />
      {data.length > 0 && <ImageGallery options={this.state.data} onClick={this.onClick} />}
      {modal.length > 0 && <Modal options={this.state.modal} />}
      {loading === true && <Button onClickLoadMore={this.onClickLoadMore} />}
      {status === "pending" && <Loader />}
      {status === "error" && <Notification message="No data!! Please enter valid value" />}
      {status === "resolved" && <Notification message="End of List" />}
    </AppContainer>)
  }
}

export default App;