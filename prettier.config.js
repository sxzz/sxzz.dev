import base from '@sxzz/prettier-config'

/** @type {import('prettier').Config} */
export default {
  ...base,
  plugins: [...base.plugins, 'prettier-plugin-astro'],
}
