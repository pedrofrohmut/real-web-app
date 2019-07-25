import React from "react"
import { Image } from "semantic-ui-react"
import PropTypes from "prop-types"

import noImageSrc from "../../img/NO_IMG.png"

const NoImage = ({ size }) => <Image size={size} src={noImageSrc} />

NoImage.propTypes = {
  size: PropTypes.string,
}

NoImage.defaultProps = {
  size: "small",
}

export default NoImage
