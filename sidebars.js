// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Partner API',
      collapsed: false,
      items: ['partner_api', 'api_reference'],
    },
  ],
};

export default sidebars;
