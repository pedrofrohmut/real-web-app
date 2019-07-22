import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ConfirmEmailMessage from "../components/messages/ConfirmEmailMessage"
import { Container, Message } from "semantic-ui-react"

const DashboardPage = ({ isConfirmed }) => (
  <Container>
    <h1>Dashboard</h1>

    {!isConfirmed && <ConfirmEmailMessage />}

    {isConfirmed && (
      <Message
        success
        header="Welcome to the WormBooks"
        content="Your e-mail is confirmed."
      />
    )}
  </Container>
)

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isConfirmed: state.user.isConfirmed,
})

export default connect(mapStateToProps)(DashboardPage)
