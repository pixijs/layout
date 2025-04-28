// NOTE: this should be replaced with `@pixi/layout`
import '/layout';
import Application from './boilerplate';

const defaults = {
    backgroundColor: `#1e293b`,
    borderWidth: 1,
    borderColor: `#fff`,
};

export default function App() {
    return (
        <Application>
            <layoutContainer
                layout={{
                    ...defaults,
                    width: 200,
                    height: 200,
                    padding: 10,
                    flexDirection: 'column',
                    backgroundColor: `#0f172a`,
                }}
            >
                <layoutContainer layout={{ ...defaults, margin: 5, padding: 20, borderWidth: 20, height: 50 }} />
                <layoutContainer layout={{ ...defaults, height: 50 }} />
            </layoutContainer>
        </Application>
    );
}
