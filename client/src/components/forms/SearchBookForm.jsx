import React from "react"
import axios from "axios"
import { Form, Dropdown } from "semantic-ui-react"

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

    if (query === "") {
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
      })
  }

  render() {
    const { data, isLoading, errors } = this.state

    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search book by title"
          value={data.query}
          onSearchChange={this.onSearchChange}
          options={data.options}
          loading={isLoading}
        />
      </Form>
    )
  }
}

export default SearchBookForm
