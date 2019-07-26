import React from "react"
import PropTypes from "prop-types"
import {
  Form, Button, Grid, Image, Segment,
} from "semantic-ui-react"
import InlineError from "../messages/InlineError"

const isValidGoodreadId = goodreadsId => goodreadsId !== ""

const isValidTitle = title => title !== ""

const isValidAuthors = authors => authors !== ""

const isValidPages = pages => pages !== ""

const isValidForm = (book) => {
  const goodreadsId = isValidGoodreadId(book.goodreadsId)
    ? ""
    : "GoodreadsId cannot be blank"
  const title = isValidTitle(book.title) ? "" : "Title cannot be blank"
  const authors = isValidAuthors(book.authors) ? "" : "Authors cannot be blank"
  const pages = isValidPages(book.pages) ? "" : "Pages cannot be blank"

  return {
    goodreadsId,
    title,
    authors,
    pages,
  }
}

class BookForm extends React.Component {
  state = {
    data: {
      book: {
        goodreadsId: this.props.book.goodreadsId,
        title: this.props.book.title,
        authors: this.props.book.authors,
        cover: this.props.book.covers[0],
        pages: this.props.book.pages,
      },
      covers: this.props.book.covers,
      currentCoverIndex: 0,
    },
    isLoading: false,
    errors: {
      goodreadsId: "",
      title: "",
      authors: "",
      pages: "",
      global: "",
    },
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        book: {
          goodreadsId: props.book.goodreadsId,
          title: props.book.title,
          authors: props.book.authors,
          cover: props.book.covers[0],
          pages: props.book.pages,
        },
        covers: props.book.covers,
      },
    })
  }

  handleChangeCover = () => {
    const { covers, currentCoverIndex } = this.state.data
    /* eslint-disable-next-line max-len */
    const newIndex = currentCoverIndex + 1 >= covers.length ? 0 : currentCoverIndex + 1
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        currentCoverIndex: newIndex,
        book: {
          ...this.state.data.book,
          cover: covers[currentCoverIndex],
        },
      },
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      data: {
        book: {
          ...this.state.data.book,
          [e.target.name]: e.target.value,
        },
      },
    })
  }

  handleChangeNumber = (e) => {
    this.setState({
      ...this.state,
      data: {
        book: {
          ...this.state.data.book,
          [e.target.name]: parseInt(e.target.value, 10),
        },
      },
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      goodreadsId, title, authors, pages,
    } = this.state.data.book

    const errors = isValidForm({
      goodreadsId,
      title,
      authors,
      pages,
    })

    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        ...errors,
      },
    })

    if (
      !errors.goodreadsId
      && !errors.title
      && !errors.authors
      && !errors.pages
    ) {
      this.setState({
        isLoading: true,
      })

      this.props.onSubmit().catch((err) => {
        this.setState(state => ({
          ...state,
          errors: {
            ...state.errors,
            ...err.response.data.errors,
          },
          isLoading: false,
        }))
      })
    }
  }

  render() {
    const { data, isLoading, errors } = this.state

    return (
      <Segment>
        <Form className="BookForm" loading={isLoading}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="title">Title</label>

                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.book.title}
                    onChange={this.handleChange}
                  />

                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field>
                  <label htmlFor="authors">Authors</label>

                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Authors"
                    value={data.book.authors}
                    onChange={this.handleChange}
                  />

                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>

                <Form.Field>
                  <label htmlFor="pages">Pages</label>

                  <input
                    type="text"
                    id="pages"
                    name="pages"
                    placeholder="Number of pages"
                    disabled={data.book.pages === undefined}
                    value={
                      data.book.pages !== undefined
                        ? data.book.pages
                        : "Loading..."
                    }
                    onChange={this.handleChangeNumber}
                  />

                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>

              <Grid.Column
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image size="small" src={data.book.cover} />
                {data.covers > 1 && (
                  /* eslint-disable-next-line */
                  <a role="button" onClick={this.handleChangeCover}>
                    Another Cover
                  </a>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Button primary style={{ marginTop: "25px" }}>
            Save
          </Button>
        </Form>
      </Segment>
    )
  }
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number.isRequired,
  }).isRequired,
}

export default BookForm
