import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHero() {
  return (
    <header className={styles.hero}>
      <img
        className={styles.enso}
        src={useBaseUrl('/img/logo.png')}
        alt=""
        width="170"
      />
      <img
        className={styles.wordmark}
        src={useBaseUrl('/img/wordmark.png')}
        alt="ChanGPT — 問中見道"
        width="320"
      />
      <p className={styles.subtitle}>
        帶點禪味的 AI — 佛法問答 · 經典語意搜尋 · 智慧對話
      </p>
      <div className={styles.buttons}>
        <Link
          className="button button--primary button--lg"
          href="https://app.changpt.org">
          線上體驗
        </Link>
        <Link
          className={`button button--outline button--lg ${styles.buttonInk}`}
          to="/docs/intro">
          開發者文件
        </Link>
      </div>
    </header>
  );
}

function ExploreSection() {
  const items = [
    {
      title: '文件 Docs',
      to: '/docs/intro',
      description: 'Partner API 指南與完整 API 參考，含 curl 與 Python 範例。',
    },
    {
      title: '研究 Research',
      to: '/research',
      description: 'RAG 實驗、檢索基準測試與佛學 AI 研究。',
    },
    {
      title: '體驗 Demo',
      to: '/demo',
      description: '佛法問答、語意搜尋與 AI 對話的互動展示。',
    },
  ];
  return (
    <section className={styles.explore}>
      <div className="container">
        <div className="row">
          {items.map((item) => (
            <div className="col col--4" key={item.to}>
              <Link to={item.to} className={styles.exploreCard}>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="ChanGPT — 帶點禪味的 AI。佛法問答、經典語意搜尋，以及 OpenAI 相容的 Partner API。">
      <HomepageHero />
      <main>
        <HomepageFeatures />
        <ExploreSection />
      </main>
    </Layout>
  );
}
