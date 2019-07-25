import jwt from "jsonwebtoken"

const authenticate = function(req, res, next) {
  const { authorization } = req.headers
  let token
  if (authorization) {
    /* eslint-disable-next-line */
    token = authorization.split(" ")[1]
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        res.status(401).json({ errors: { global: "Invalid Token" } })
      }
      req.userEmail = decoded.email
      next()
    })
  } else {
    res.status(401).json({ errors: { global: "No token provided" } })
  }
}

export default authenticate
