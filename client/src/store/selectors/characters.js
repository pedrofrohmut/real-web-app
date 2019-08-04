import { createSelector } from "reselect"

const charactersHashSelector = state => state.characters

export const charactersSelector = createSelector(
  charactersHashSelector,
  hash => Object.values(hash),
)
