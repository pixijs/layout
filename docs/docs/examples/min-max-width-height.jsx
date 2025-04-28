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
                    height: 250,
                    padding: 10,
                    flexDirection: 'column',
                    backgroundColor: `#0f172a`,
                }}
            >
                <layoutContainer layout={{ ...defaults, margin: 5, height: 25 }} />
                <layoutContainer layout={{ ...defaults, margin: 5, height: 100, maxHeight: 25 }} />
                <layoutContainer layout={{ ...defaults, margin: 5, height: 25, minHeight: 50 }} />
                <layoutContainer layout={{ ...defaults, margin: 5, height: 25, maxWidth: 25 }} />
                <layoutContainer layout={{ ...defaults, margin: 5, height: 25, width: 25, minWidth: 50 }} />
            </layoutContainer>
        </Application>
    );
}
