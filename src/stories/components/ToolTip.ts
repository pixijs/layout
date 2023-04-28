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
        scale: 0.5
    });

    const layout = new Layout({
        content: [
            {
                content: text,
                styles: {
                    color: 'white',
                    fontSize: 16,
                    position: 'leftCenter',
                    maxWidth: '85%',
                    maxHeight: '100%',
                    marginLeft: 20,
                }
            },
            {
                content: closeButton,
                styles: {
                    position: 'right',
                    paddingTop: 20,
                    paddingRight: 20,
                    scale: 0.5
                }
            }
        ],
        styles: {
            background: '#292c2e',
            width: '96%',
            height: 100,
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
