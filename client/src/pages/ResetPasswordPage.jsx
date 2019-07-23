import React from "react"
import { Container, Message } from "semantic-ui-react"

class ResetPasswordPage extends React.Component {
  state = {
    isLoading: true,
    success: false,
  }

  render() {
    const { isLoading, success } = this.state

    return (
      <Container className="ResetPasswordPage">
        {isLoading && <Message content="Loading..." />}

        {!isLoading && success && <Message success content="Form" />}

        {!isLoading && !success && <Message negative content="Invalid Token" />}
      </Container>
    )
  }
}

export default ResetPasswordPage
