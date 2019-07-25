import React from "react"
import { Container } from "semantic-ui-react"
import SearchBookForm from "../components/forms/SearchBookForm"
import BookForm from "../components/forms/BookForm"

class NewBookPage extends React.Component {
  state = {
    book: undefined,
  }

  handleBookSelect = (book) => {
    console.log("BOOK SELECT", book)
    this.setState({ book })
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
