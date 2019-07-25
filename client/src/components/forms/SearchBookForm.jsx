import React from "react"
import axios from "axios"
import { Form, Dropdown, Segment } from "semantic-ui-react"
import PropTypes from "prop-types"

const INITIAL_OPTIONS = [
  {
    key: 1,
    value: 1,
    text: "first book",
  },
  {
    key: 2,
    value: 2,
    text: "second book",
  },
]

class SearchBookForm extends React.Component {
  state = {
    data: {
      query: "",
      books: [],
      options: INITIAL_OPTIONS,
    },
    isLoading: false,
    errors: {
      query: "",
      global: "",
    },
  }

  timer = undefined

  onSearchChange = (e, searchInput) => {
    clearTimeout(this.timer)
    this.setState({
      data: {
        query: searchInput.searchQuery,
      },
    })
    this.timer = setTimeout(this.fetchOptions, 1000)
  }

  fetchOptions = () => {
    const { query } = this.state.data

    if (!query) {
      return
    }

    this.setState({
      isLoading: true,
    })

    axios
      .get(`/api/books/search?q=${query}`)
      .then(response => response.data.books)
      .then((books) => {
        const options = []
        const booksHash = {}

        books.forEach((book) => {
          booksHash[book.goodreadsId] = book
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title,
          })
        })

        this.setState({
          isLoading: false,
          data: {
            options,
            books: booksHash,
          },
        })
      })
  }

  handleChange = (e, dropdown) => {
    this.setState(state => ({
      ...state,
      data: {
        ...state.data,
        query: dropdown.value,
      },
    }))

    this.props.onBookSelect(this.state.data.books[dropdown.value])
  }

  render() {
    const { data, isLoading } = this.state

    return (
      <Segment>
        <Form>
          <Dropdown
            search
            fluid
            placeholder="Search book by title"
            value={data.query}
            onSearchChange={this.onSearchChange}
            options={data.options}
            loading={isLoading}
            onChange={this.handleChange}
          />
        </Form>
      </Segment>
    )
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired,
}

export default SearchBookForm
