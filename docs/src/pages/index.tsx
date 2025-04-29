import clsx from 'clsx';
import { type JSX } from 'react';
import CTA from './CTA';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header className={clsx(styles.heroBanner)}>
            <div className="container">
                <Heading as="h1">
                    <img src="/img/logo-main.svg" alt="Logo" width={'100%'} style={{ maxHeight: 150 }} />
                </Heading>
                <p className="hero__subtitle" style={{ marginTop: -30 }}>
                    {siteConfig.tagline}
                </p>
                <p style={{ display: 'flex', gap: 4, justifyContent: 'center', paddingBottom: 8 }}>
                    {' '}
                    <a href="https://npmjs.com/package/@pixi/layout">
                        <img src="https://img.shields.io/npm/v/@pixi/layout.svg" alt="npm package" />
                    </a>
                    <a href="https://opencollective.com/pixijs">
                        <img
                            src="https://opencollective.com/pixijs/tiers/badge.svg"
                            alt="Start new PR in StackBlitz Codeflow"
                        />
                    </a>
                    <a href="https://discord.gg/QrnxmQUPGV">
                        <img
                            src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord"
                            alt="discord chat"
                        />
                    </a>
                </p>
                <div className={styles.ctaButtons}>
                    <CTA label="Getting Started" link="docs/guides/guide/quick-start/" />
                    <CTA label="Examples" link="docs/examples/align-content/" white={true} outline={true} />
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title={`${siteConfig.title}`} description="A layout library for PixiJS">
            <HomepageHeader />
            <main
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={styles.featureTitle}>📐 Yoga-Powered Flexbox Layout</div>
                        <p>
                            Built on top of Facebook’s Yoga engine, enabling powerful and predictable flexbox layouting
                            for 2D interfaces.
                        </p>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.featureTitle}>📦 Supports all PixiJS Objects</div>
                        <p>
                            Supports all PixiJS objects, such as Container, Sprite, Graphics, Text, etc. to deliver
                            responsive, visually rich UI components.
                        </p>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.featureTitle}>🧠 Simple and Intuitive API</div>
                        <p>
                            Designed with usability in mind, declare your layouts using familiar properties with minimal
                            boilerplate.
                        </p>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.featureTitle}>🎯 Advanced Styling Support</div>
                        <p>
                            Includes support for styling properties like objectFit, objectPosition, overflow,
                            backgroundColor, and borderRadius, bringing web-style flexibility to canvas UIs.
                        </p>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.featureTitle}>🤝 Compatible with PixiJS React</div>
                        <p>
                            Easily integrates with PixiJS React, allowing you to combine layout and interactivity in
                            React environments.
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
