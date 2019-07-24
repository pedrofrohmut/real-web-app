import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Menu, Dropdown, Image } from "semantic-ui-react"
import gravatarUrl from "gravatar-url"
import PropTypes from "prop-types"
import * as actions from "../../store/actions/auth"

const Navbar = ({ user, logout }) => (
  <Menu secondary pointing>
    <Menu.Item>
      <Link to="/dashboard">Dashboard</Link>
    </Menu.Item>

    <Menu.Menu
      position="right"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  { logout: actions.logout },
)(Navbar)
