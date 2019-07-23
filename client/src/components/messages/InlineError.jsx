import React from "react"
import PropTypes from "prop-types"

const InlineError = ({ text }) => (
  <div style={{ color: "var(--redError)", padding: "5px 8px" }}>{text}</div>
)

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
}

export default InlineError
