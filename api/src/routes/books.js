import express from "express"
import authenticate from "../middlewares/authenticate"
import request from "request-promise"
import { parseString } from "xml2js"
import Book from "../models/Book"
import parseErrors from "../utils/parseErrors"

const router = express.Router()

router.use(authenticate)

router.get("/", function(req, res) {
  Book.find({ userId: req.currentUser._id })
    .then(books => {
      res.status(200).json({ books })
    })
    .catch(err => {
      res.status(400).json({ errors: parseErrors(err.errors) })
    })
})

router.post("/", function(req, res) {
  console.log("REQ BODY", req.body)
  Book.create({ ...req.body.newBook, userId: req.currentUser._id })
    .then(book => {
      res.status(200).json({ book })
    })
    .catch(err => {
      res.status(400).json({ errors: parseErrors(err.errors) })
    })
})

router.get("/search", (req, res) => {
  const query = req.query.q
  const url = `https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_API_KEY}&q=${query}`
  request.get(url).then(result => {
    parseString(result, function(err, parsedResult) {
      if (err) {
        res.status(500).json({ message: "could not be parsed" })
      }
      const works = parsedResult.GoodreadsResponse.search[0].results[0].work
      const books = works.map(work => {
        return {
          goodreadsId: work.best_book[0].id[0]._,
          title: work.best_book[0].title[0],
          authors: work.best_book[0].author[0].name[0],
          covers: [work.best_book[0].image_url[0]],
        }
      })
      res.status(200).json({ books })
    })
  })
})

router.get("/fetchPages", (req, res) => {
  const { goodreadsId } = req.query
  const url = `https://www.goodreads.com/book/show.xml?key=${process.env.GOODREADS_API_KEY}&id=${goodreadsId}`
  request.get(url).then(result => {
    parseString(result, function(err, parsedResult) {
      if (err) {
        res.status(500).json({ message: "could not be parsed" })
      }
      const numPages = parsedResult.GoodreadsResponse.book[0].num_pages[0]
      const pages = numPages ? parseInt(numPages, 10) : 0
      res.status(200).json({ pages })
    })
  })
})

export default router
