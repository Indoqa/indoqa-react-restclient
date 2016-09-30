export default (response) => {
  if (!response.ok) {
    throw response
  }

  if (response.status === 204 || response.status === 202) {
    return null
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json()
  }

  return response
}
