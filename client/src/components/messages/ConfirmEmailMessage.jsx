import React from "react"
import { Message } from "semantic-ui-react"

const ConfirmEmailMessage = () => (
  <Message
    info
    header="Your e-mail is not confirmed yet."
    content="Please, verify your e-mail to unlock awesomeness."
  />
)

export default ConfirmEmailMessage
