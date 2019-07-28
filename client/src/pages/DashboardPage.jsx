import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ConfirmEmailMessage from "../components/messages/ConfirmEmailMessage"
import { Container, Message } from "semantic-ui-react"
import { allBooksSelector } from "../store/selectors/books"
import AddBookCta from "../components/ctas/AddBookCta"
import * as actions from "../store/actions/books"

class DashboardPage extends React.Component {
  componentDidMount() {
    this.onInit(this.props)
  }

  onInit = props => props.fetchBooks()

  render() {
    const { isConfirmed, books } = this.props

    return (
      <Container>
        <h1>Dashboard</h1>

        {!isConfirmed && <ConfirmEmailMessage />}

        {isConfirmed && books.length === 0 && (
          <Message
            success
            header="Welcome to the WormBooks"
            content="Your e-mail is confirmed."
          />
        )}

        {books.length > 0 ? <p>You have books!</p> : <AddBookCta />}
      </Container>
    )
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  fetchBooks: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isConfirmed: state.user.isConfirmed,
  books: allBooksSelector(state),
})

export default connect(
  mapStateToProps,
  { fetchBooks: actions.fetchBooks },
)(DashboardPage)
