import camelCase from 'lodash/camelCase'

const registerStoreModules = () => {
  const requireModule = require.context('.', false, /\.js$/)
  const modules = {}

  requireModule.keys().forEach(filename => {
    if (filename === './index.js' || filename === './hooks.js' || filename === './helpers.js') return
    const moduleName = camelCase(filename.replace(/(\.\/|\.js)/g, ''))
    modules[moduleName] = requireModule(filename).default
  })
  return modules
}

const httpToken = (http, token = null) => {
  delete http.defaults.headers['Authorization']
  if (token !== null) {
    http.defaults.headers['Authorization'] = 'Token ' + token
  }
}

export {
  httpToken,
  registerStoreModules
}
