const path = require('path')

// Theme API.
module.exports = (options, ctx) => ({
  alias() {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        (base) => themeConfig.locales[base].algolia,
      )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js'),
    }
  },

  plugins: [
    ['@vuepress/active-header-links', options.activeHeaderLinks],
    '@vuepress/search',
    '@vuepress/plugin-nprogress',
    [
      'container',
      {
        type: 'tip',
        defaultTitle: {
          '/en/': 'Tip',
        },
      },
    ],
    [
      'container',
      {
        type: 'warning',
        defaultTitle: {
          '/en/': 'Warning',
        },
      },
    ],
    [
      'container',
      {
        type: 'danger',
        defaultTitle: {
          '/en/': 'Danger',
        },
      },
    ],
    [
      'container',
      {
        type: 'success',
        defaultTitle: {
          '/en/': 'Success',
        },
      },
    ],
  ],
})
