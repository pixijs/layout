import { Layout } from '../../../Layout';
import { BlockWithBorder } from './BlockWithBorder';
import { ModeSwitcher } from './ModeSwitcher';
import { PlayButton } from './PlayButton';

export class ControlBlock extends Layout
{
    constructor()
    {
        super({
            content: [
                new BlockWithBorder('bet'),
                new PlayButton(),
                new ModeSwitcher(),
            ],
            styles: {
                width: '100%',
                height: '100%',
            },
        });

        this.layout.updateParents();
    }
}
