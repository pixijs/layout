// NOTE: this should be replaced with `@pixi/layout`
import { Texture } from 'pixi.js';
import Application from './boilerplate';
import '/layout';


const Layout = () => {
    // Create an array of 15 sprites
    const sprites = Array.from({ length: 15 }, (_, i) => (
        <pixiSprite
            key={i}
            texture={Texture.from('https://fakeimg.pl/100x100/')}
            layout={{
                width: '100',
                height: '100',
            }}
        />
    ));
    return (
        <layoutContainer
            layout={{
                width: '80%',
                height: '80%',
                justifyContent: 'center',
                flexDirection: 'row',
                alignContent: 'center',
                flexWrap: 'wrap',
                gap: 4,
                borderWidth: 4,
                // LayoutContainer specific
                borderColor: 'white',
                backgroundColor: '#1e293b',
                borderRadius: 8,
            }}
        >
            {sprites}
        </layoutContainer>
    );
};

export default function App() {
    return (
        <Application assets={['https://fakeimg.pl/100x100/']}>
            <Layout />
        </Application>
    );
}
