import { PlaygroundEditor } from '../Editor/PlaygroundEditor';
import styles from './index.module.css';
import BoilerplateCode from '!!raw-loader!./examples/boilerplate';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useCodeExamples } from '@site/src/components/Playground/PixiPlayground/useEditorCode';
import { usePlaygroundURLState } from '@site/src/components/Playground/PixiPlayground/usePlaygroundURLState';

export default function Playground() {
    const [urlState, setURLState] = usePlaygroundURLState();
    const { state } = urlState;

    const { indexCode, handleEditorCodeChanged } = useCodeExamples({
        urlState: state,
        setURLState,
        pixiVersion: {
            versionLabel: 'latest',
            version: 'latest',
            releaseNotes: 'latest',
            docs: 'latest',
            build: 'latest',
            npm: 'latest',
            latest: true,
        },
    });

    return (
        <div className={styles.wrapper}>
            <BrowserOnly>
                {() => (
                    <PlaygroundEditor
                        files={{
                            '/App.js': indexCode,
                            '/boilerplate.js': BoilerplateCode,
                        }}
                        dependencies={{ 'pixi.js': 'latest' }}
                        handleEditorCodeChanged={handleEditorCodeChanged}
                    />
                )}
            </BrowserOnly>
        </div>
    );
}
