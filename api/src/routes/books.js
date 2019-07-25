import express from "express"
import authenticate from "../middlewares/authenticate"

const router = express.Router()

router.use(authenticate)

router.get("/search", (req, res) => {
  res.status(200).json({
    books: [
      {
        goodreadsId: 1,
        title: "1984",
        authors: "Orwell",
        covers: [
          "https://images.gr-assets.com/books/13489905661/5470.jpg",
          "https://images.gr-assets.com/books/15046119571/9577857.jpg",
        ],
        pages: 198,
      },
      {
        goodreadsId: 2,
        title: "Three Men in a boat",
        authors: "Jerome K. Jerome",
        covers: [
          "https://images.gr-assets.com/books/13627916761/4921.jpg",
          "https://images.gr-assets.com/books/13120368781/627830.jpg",
        ],
        pages: 256,
      },
    ],
  })
})

export default router