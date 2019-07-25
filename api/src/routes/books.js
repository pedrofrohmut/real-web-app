import express from "express"
import authenticate from "../middlewares/authenticate"
import request from "request-promise"
import { parseString } from "xml2js"

const router = express.Router()

router.use(authenticate)

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

  // res.status(200).json({
  //   books: [
  //     {
  //       goodreadsId: 1,
  //       title: "1984",
  //       authors: "Orwell",
  //       covers: [
  //         "https://images.gr-assets.com/books/13489905661/5470.jpg",
  //         "https://images.gr-assets.com/books/15046119571/9577857.jpg",
  //       ],
  //       pages: 198,
  //     },
  //     {
  //       goodreadsId: 2,
  //       title: "Three Men in a boat",
  //       authors: "Jerome K. Jerome",
  //       covers: [
  //         "https://images.gr-assets.com/books/13627916761/4921.jpg",
  //         "https://images.gr-assets.com/books/13120368781/627830.jpg",
  //       ],
  //       pages: 256,
  //     },
  //   ],
  // })
})

export default router
