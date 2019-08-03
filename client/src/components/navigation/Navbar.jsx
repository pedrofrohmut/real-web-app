import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Menu, Dropdown, Image } from "semantic-ui-react"
import gravatarUrl from "gravatar-url"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import * as actions from "../../store/actions/auth"
import { allBooksSelector } from "../../store/selectors/books"
import * as localeActions from "../../store/actions/locale"

const Navbar = ({
  user, logout, setLocale, hasBooks,
}) => (
  <Menu secondary pointing>
    <Menu.Item>
      <Link to="/dashboard">
        <FormattedMessage id="nav.dashboard" defaultMessage="DEFAULT" />
      </Link>
    </Menu.Item>

    {hasBooks && (
      <Menu.Item>
        <Link to="/books/new">Add New Book</Link>
      </Menu.Item>
    )}

    <Menu.Menu
      position="right"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <a
        role="button"
        className="lang-buttons"
        onClick={() => {
          setLocale("en")
        }}
      >
        en
      </a>
      {" | "}
      <a
        role="button"
        className="lang-buttons"
        onClick={() => {
          setLocale("pt")
        }}
      >
        pt
      </a>
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
)

Navbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  hasBooks: PropTypes.bool.isRequired,
  setLocale: PropTypes.func.isRequired,
}

const mapStateToProps = function (state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0,
  }
}

export default connect(
  mapStateToProps,
  { logout: actions.logout, setLocale: localeActions.setLocale },
)(Navbar)
