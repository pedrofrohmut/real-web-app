import React from "react"
import { Link } from "react-router-dom"
import { Card, Icon } from "semantic-ui-react"

const AddBookCta = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header style={{ padding: "20px 0" }}>Add new book</Card.Header>
      <Link to="/books/new" style={{ display: "block", paddingBottom: "20px" }}>
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
)

export default AddBookCta
