// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)
  else return null
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('user')
}

// set the token and user from the session storage
export const setUserSession = (user) => {
  console.log('set session')
  localStorage.setItem('user', JSON.stringify(user))
}

