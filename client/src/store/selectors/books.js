import { createSelector } from "reselect"

export const booksSelector = state => state.books

export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash),
)
