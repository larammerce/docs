module.exports = {
    title: 'Larammerce',
    description: 'An open-source ecommerce platform.',

    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        ['@vuepress/google-analytics', {
            ga: '' // TODO: fill the google analytics.
        }],
        ['container', {
            type: 'vue',
            before: '<pre class="vue-container"><code>',
            after: '</code></pre>',
        }],
        ['sitemap', {
            hostname: 'https://docs.larammerce.com',
        }],
    ],

    markdown: {
        lineNumbers: true,
    },

    head: [
        [
            'link',
            {
                href: 'https://fonts.googleapis.com/css?family=Nunito:100,300,400,500,600,700',
                rel: 'stylesheet',
                type: 'text/css',
            },
        ],
        [
            "link",
            {
                rel: 'manifest',
                href: '/manifest.json'
            }
        ],
        [
            "link",
            {
                rel: 'icon',
                href: '/favicon.ico'
            }
        ]
    ],

    themeConfig: {
        logo: '/assets/img/logo-full.svg',
        repo: 'larammerce/larammerce',
        docsRepo: 'larammerce/docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        displayAllHeaders: false,
        sidebarDepth: 0,
        algolia: {
            apiKey: '', // TODO: fill the algolia
            indexName: 'larammerce',
            algoliaOptions: {'facetFilters': ["version:8"]},
        },

        nav: [
            {
                text: 'Version',
                link: '/',
                items: [
                    // {text: 'LE 4.x', link: '/4.x/'},
                    {text: '8.x', link: '/8.x/'},
                    //{text: 'CSV 1.0', link: '/csv/1.0/', divider: true},
                ]
            },
        ],

        sidebar: {
            '/8.x/': require('./8.x'),
        },
    },
};
