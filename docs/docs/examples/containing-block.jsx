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
            <layoutContainer layout={{ ...defaults, width: 200, height: 200, padding: 10, backgroundColor: `#0f172a` }}>
                <layoutContainer layout={{ ...defaults, height: 100, width: 100, position: 'static' }}>
                    <layoutContainer
                        layout={{ ...defaults, height: 25, width: '50%', bottom: 10, position: 'absolute' }}
                    />
                </layoutContainer>
            </layoutContainer>
        </Application>
    );
}
