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
        id: 'toolTip',
        content: [
            {
                id: 'text',
                content: text,
                styles: {
                    display: 'inline',
                    padding: 20,
                    color: 'white',
                    fontSize: 16,
                    paddingRight: 50
                }
            },
            {
                id: 'closeButton',
                content: closeButton,
                styles: {
                    display: 'inline',
                    position: 'right',
                    margin: 10
                }
            }
        ],
        styles: {
            background: '#292c2e',
            width: '96%',
            borderRadius: 20,
            position: 'centerTop',
            marginTop: 10
        }
    });

    closeButton.on('click', () =>
    {
        layout.visible = false;
    });

    return layout;
}
