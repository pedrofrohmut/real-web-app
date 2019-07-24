import React from "react"
import { Container } from "semantic-ui-react"
import SearchBookForm from "../components/forms/SearchBookForm"

class NewBookPage extends React.Component {
  state = {
    book: undefined,
  }

  render() {
    return (
      <Container className="NewBookPage">
        <h1>Add new book to your collection</h1>

        <SearchBookForm />
      </Container>
    )
  }
}

export default NewBookPage
