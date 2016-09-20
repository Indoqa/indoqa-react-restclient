import handleRestResponse from './handleRestResponse'

const prefixUrl = (url, property, defaultPrefix) => {
  const environmentProperty = window[property]

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

export const fetchSearch = (url, options) => {
  return fetch(
    prefixUrl(url, 'searchProxyUrl', '/search'),
    addDefaults(options, 'searchProxyCredentials')).then(handleRestResponse)
}

export const fetchContentProvider = (url, options) => {
  return fetch(
    prefixUrl(url, 'contentProviderProxyUrl', '/content'),
    addDefaults(options, 'contentProviderCredentials')).then(handleRestResponse)
}
