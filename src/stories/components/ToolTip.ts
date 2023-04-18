import { Layout } from '../../Layout';
import { FancyButton } from '@pixi/ui';
import { preloadAssets } from '../utils/helpers';

export async function toolTip(text: string): Promise<Layout>
{
    const assets = {
        closeIcon: 'Icons/CloseIcon.png'
    };

    await preloadAssets(Object.values(assets));

    const closeButton = new FancyButton({
        defaultView: assets.closeIcon,
        scale: 0.3
    });

    const layout = new Layout({
        content: [
            {
                content: text,
                styles: {
                    color: 'white',
                    fontSize: 16,
                    width: '80%'
                }
            },
            {
                content: closeButton,
                styles: {
                    position: 'right',
                    marginTop: 15,
                    marginRight: 15,
                }
            }
        ],
        styles: {
            padding: 20,
            background: '#292c2e',
            width: '96%',
            borderRadius: 20,
            position: 'centerTop',
            marginTop: 10,
            zIndex: 100000
        }
    });

    closeButton.on('click', () =>
    {
        layout.visible = false;
    });

    return layout;
}
