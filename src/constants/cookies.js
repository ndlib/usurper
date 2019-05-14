// Keep cookie names stored here to prevent inconsistencies.
export const HIDE_HOME_FAVORITES = 'hideHomeFavorites'

// Use this whenever setting a cookie. Again, to ensure consistency.
export const cookieOptions = (name) => {
  switch (name) {
    case HIDE_HOME_FAVORITES:
    default:
      return { path: '/', expires: new Date(2147483647000) }
  }
}
