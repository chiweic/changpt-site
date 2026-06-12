// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ChanGPT',
  tagline: '問中見道 — 帶點禪味的 AI',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://changpt.org',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'ChanGPT Blog',
            description: 'ChanGPT 產品與研究消息',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      metadata: [
        {
          name: 'description',
          content:
            'ChanGPT — 帶點禪味的 AI。佛法問答、經典語意搜尋，以及 OpenAI 相容的 Partner API。Buddhist Q&A with citations, semantic search over Buddhist texts, and an OpenAI-compatible partner API.',
        },
      ],
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'ChanGPT',
        logo: {
          alt: 'ChanGPT 禪圓標誌',
          src: 'img/logo.png',
          srcDark: 'img/logo-dark.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: '文件',
          },
          {to: '/research', label: '研究', position: 'left'},
          {to: '/demo', label: '體驗', position: 'left'},
          {to: '/blog', label: '網誌', position: 'left'},
          {
            href: 'https://app.changpt.org',
            label: 'App ↗',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文件',
            items: [
              {label: '開始使用', to: '/docs/intro'},
              {label: 'Partner API Guide', to: '/docs/partner_api'},
              {label: 'API Reference', to: '/docs/api_reference'},
            ],
          },
          {
            title: '探索',
            items: [
              {label: '研究', to: '/research'},
              {label: '體驗', to: '/demo'},
              {label: '網誌', to: '/blog'},
            ],
          },
          {
            title: '應用',
            items: [
              {label: 'ChanGPT App', href: 'https://app.changpt.org'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} ChanGPT · 問中見道`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
