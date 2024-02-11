/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * "Robotic Arm Study"
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
