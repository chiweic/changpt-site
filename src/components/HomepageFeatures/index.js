import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/* The four brand pillars from the ChanGPT brand sheet — gold icons on ink. */
const FeatureList = [
  {
    icon: '/img/feat-zen.png',
    title: '禪意智慧',
    subtitle: '回歸本心',
    description: '以禪的態度回應提問——清楚、簡明、安住當下。',
  },
  {
    icon: '/img/feat-ai.png',
    title: 'AI 技術',
    subtitle: '精準問答',
    description: '檢索增強生成（Agentic RAG），每個回答都附上經典出處與引用。',
  },
  {
    icon: '/img/feat-sutra.png',
    title: '佛法經典',
    subtitle: '智慧傳承',
    description: '語意搜尋佛法經典與開示，讓智慧傳承觸手可及。',
  },
  {
    icon: '/img/feat-heart.png',
    title: '慈悲關懷',
    subtitle: '利益眾生',
    description: '開放 Partner API，與更多夥伴一起利益眾生。',
  },
];

function Feature({icon, title, subtitle, description}) {
  return (
    <div className="col col--3">
      <div className={styles.feature}>
        <img src={useBaseUrl(icon)} alt="" className={styles.featureIcon} />
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureSubtitle}>{subtitle}</p>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.featureBand}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
