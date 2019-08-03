import { LOCALE_SET } from "./types"

export const localeSet = lang => ({
  type: LOCALE_SET,
  lang,
})

export const setLocale = function (lang) {
  return function (dispatch) {
    localStorage.setItem("alhubLang", lang)
    dispatch(localeSet(lang))
  }
}
