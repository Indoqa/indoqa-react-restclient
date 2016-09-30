import handleRestResponse from './handleRestResponse'

const prefixUrl = (url, property, defaultPrefix) => {
  const environmentProperty = window[property]

  if (environmentProperty === '') {
    return url
  }

  if (!environmentProperty) {
    return `${defaultPrefix}${url}`
  }

  if (typeof environmentProperty === 'function') {
    return environmentProperty(url)
  }

  return `${environmentProperty}${url}`
}

const addDefaults = (options, credentialsProperty) => {
  if (!options) {
    options = {}
  }

  if (!options.headers) {
    options.headers = {}
  }

  if (!options.headers['Accept']) {
    options.headers['Accept'] = 'application/json'
  }

  if (!options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json'
  }

  const credentials = window[credentialsProperty]
  if (credentials) {
    options.headers['Authorization'] = credentials
  }

  options.mode = 'same-origin'
  options.credentials = 'same-origin'

  return options
}

export default (url, proxyOptions, requestOptions) => {
  const {defaultPrefix, urlProperty, credentialsProperty} = proxyOptions

  return fetch(
    prefixUrl(url, urlProperty, defaultPrefix),
    addDefaults(requestOptions, credentialsProperty))
  .then(handleRestResponse)
}
