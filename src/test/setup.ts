import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { jest } from '@jest/globals'

config.global.plugins = [createPinia()]

config.global.mocks = {
  $route: {
    params: {},
    query: {},
    path: '/'
  },
  $router: {
    push: jest.fn(),
    replace: jest.fn()
  }
}
