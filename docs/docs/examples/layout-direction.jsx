import '@pixi/layout';
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
                    direction: 'ltr',
                    flexDirection: 'column',
                    backgroundColor: `#0f172a`,
                }}
            >
                <layoutContainer layout={{ ...defaults, margin: 5, height: 50, width: 50 }} />
                <layoutContainer layout={{ ...defaults, margin: 5, height: 50, width: 50 }} />
            </layoutContainer>
        </Application>
    );
}
