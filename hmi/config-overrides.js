/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
const { alias } = require('react-app-rewire-alias')

module.exports = function override (config) {
  alias({
    '@components': 'src/components',
    '@styles': 'src/styles',
    '@types': 'src/types',
    '@utils': 'src/utils'
  })(config)

  return config
}
