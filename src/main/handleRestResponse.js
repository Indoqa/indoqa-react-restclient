export default (response) => {
  if (!response.ok) {
    throw response
  }

  if (response.status === 204 || response.status === 202) {
    return null
  }

  return response.json()
}
