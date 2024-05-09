import { allowedOrigins } from '../config/allowedOrigins.js'

export const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', origin)
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type',
      'content-type',
      'Authorization',
      'application/json',
      'text/plain'
    )
  }
  next()
}
