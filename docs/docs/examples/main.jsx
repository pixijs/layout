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
                    width: 250,
                    height: 475,
                    padding: 10,
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                    backgroundColor: `#0f172a`,
                }}
            >
                <layoutContainer
                    layout={{ ...defaults, flex: 1, rowGap: 10, flexDirection: 'column', alignContent: 'flex-start' }}
                >
                    <layoutContainer layout={{ ...defaults, height: 60, backgroundColor: '#334155' }} />
                    <layoutContainer layout={{ ...defaults, flex: 1, marginInline: 10, backgroundColor: '#334155' }} />
                    <layoutContainer layout={{ ...defaults, flex: 2, marginInline: 10, backgroundColor: '#334155' }} />
                    <layoutContainer
                        layout={{
                            ...defaults,
                            position: 'absolute',
                            width: '100%',
                            bottom: 0,
                            height: 64,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            backgroundColor: '#334155',
                        }}
                    >
                        <layoutContainer layout={{ ...defaults, height: 40, width: 40, backgroundColor: '#475569' }} />
                        <layoutContainer layout={{ ...defaults, height: 40, width: 40, backgroundColor: '#475569' }} />
                        <layoutContainer layout={{ ...defaults, height: 40, width: 40, backgroundColor: '#475569' }} />
                        <layoutContainer layout={{ ...defaults, height: 40, width: 40, backgroundColor: '#475569' }} />
                    </layoutContainer>
                </layoutContainer>
            </layoutContainer>
        </Application>
    );
}
