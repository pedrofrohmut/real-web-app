import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Menu, Dropdown, Image } from "semantic-ui-react"
import gravatarUrl from "gravatar-url"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import * as actions from "../../store/actions/auth"
import * as localeActions from "../../store/actions/locale"

const Navbar = ({ user, logout, setLocale }) => (
  <Menu secondary pointing>
    <Menu.Item>
      <NavLink to="/dashboard" activeClassName="active">
        <FormattedMessage id="nav.dashboard" defaultMessage="DEFAULT" />
      </NavLink>
    </Menu.Item>

    <Menu.Item>
      <NavLink to="/characters" activeClassName="active">
        <FormattedMessage id="nav.characters" defaultMessage="DEFAULT" />
      </NavLink>
    </Menu.Item>

    <Menu.Menu
      position="right"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        className="lang-buttons"
        onClick={() => {
          setLocale("en")
        }}
      >
        en
      </button>

      {" | "}

      <button
        type="button"
        className="lang-buttons"
        onClick={() => {
          setLocale("pt")
        }}
      >
        pt
      </button>

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
  setLocale: PropTypes.func.isRequired,
}

const mapStateToProps = function (state) {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  { logout: actions.logout, setLocale: localeActions.setLocale },
)(Navbar)
