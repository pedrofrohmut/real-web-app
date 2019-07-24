import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ConfirmEmailMessage from "../components/messages/ConfirmEmailMessage"
import { Container, Message } from "semantic-ui-react"
import { allBooksSelector } from "../store/selectors/books"
import AddBookCta from "../components/ctas/AddBookCta"

const DashboardPage = ({ isConfirmed, books }) => (
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

    {books.length === 0 && <AddBookCta />}
  </Container>
)

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

const mapStateToProps = state => ({
  isConfirmed: state.user.isConfirmed,
  books: allBooksSelector(state),
})

export default connect(mapStateToProps)(DashboardPage)
