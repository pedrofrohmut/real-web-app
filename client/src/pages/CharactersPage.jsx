import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Container } from "semantic-ui-react"

import { connect } from "react-redux"
import { charactersSelector } from "../store/selectors/characters"

const CharactersPage = ({ characters }) => (
  <Container>
    <h1>Characters Page</h1>
    {characters.length === 0 && (
      <div>
        <div className="alert alert-info">
          You have no characters yet. How about creating them?
        </div>
        <Link to="/characters/new" className="btn btn-primary btn-lg">
          Create New Character
        </Link>
      </div>
    )}
  </Container>
)

CharactersPage.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => ({
  characters: charactersSelector(state),
})

export default connect(mapStateToProps)(CharactersPage)
