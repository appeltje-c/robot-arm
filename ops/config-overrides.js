const { alias } = require('react-app-rewire-alias')

module.exports = function override (config) {
  alias({
    '@components': 'src/components',
    '@styles': 'src/styles',
    '@types': 'src/types'
  })(config)

  return config
}
