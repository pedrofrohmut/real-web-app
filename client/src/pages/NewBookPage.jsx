import React from "react"
import axios from "axios"
import { Container } from "semantic-ui-react"
import SearchBookForm from "../components/forms/SearchBookForm"
import BookForm from "../components/forms/BookForm"

class NewBookPage extends React.Component {
  state = {
    book: undefined,
  }

  handleBookSelect = (book) => {
    this.setState({ book })

    axios
      .get(`/api/books/fetchPages?goodreadsId=${book.goodreadsId}`)
      .then(response => response.data.pages)
      .then(pages =>
        this.setState({
          ...this.state,
          book: {
            ...book,
            pages,
          },
        }))
  }

  handleAddBook = newBook => console.log("ADD BOOK")

  render() {
    const { book } = this.state

    return (
      <Container className="NewBookPage">
        <h1>Add new book to your collection</h1>

        <SearchBookForm onBookSelect={this.handleBookSelect} />

        {book && <BookForm onSubmit={this.handleAddBook} book={book} />}
      </Container>
    )
  }
}

export default NewBookPage
