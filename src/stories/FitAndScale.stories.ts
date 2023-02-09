import { ProgressBar } from '@pixi/ui';
import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from '../utils/helpers';
import { Graphics } from '@pixi/graphics';

const args = {
    health: 50,
    energy: 50
};

const assets = {
    globalBG: 'Examples/BG.png',
    menu: 'Examples/Menu.png',
    bg: 'Progress/SmallProgressBarBG.png',
    fillPink: 'Progress/SmallProgress-pink.png',
    fillBlue: 'Progress/SmallProgress-blue.png',
    hard: 'Icons/HardIcon.png',
    energy: 'Icons/EnergyIcon.png'
};

class LayoutStory
{
    private layout!: Layout;
    private params: any;
    view = new Container();

    constructor(params: any)
    {
        this.params = params;

        preloadAssets(Object.values(assets)).then(() => this.createLayout());
    }

    createLayout()
    {
        this.layout = new Layout({
            id: 'root',
            content: [
                {
                    id: 'globalBG',
                    content: ' ',
                    styles: {
                        background: Sprite.from(assets.globalBG),
                        maxWidth: '100%'
                    }
                },
                {
                    id: 'left',
                    content: {
                        id: 'leftProgress',
                        content: [
                            {
                                id: 'energy',
                                content: Sprite.from(assets.energy),
                                styles: {
                                    position: 'left',
                                    marginLeft: -15,
                                    marginTop: -5
                                }
                            },
                            {
                                id: 'energyProgress',
                                content: new ProgressBar({
                                    bg: new Graphics().beginFill(0x000000, 0.0001).drawRect(0, 0, 355, 50).endFill(),
                                    fill: assets.fillBlue,
                                    progress: this.params.energy
                                }),
                                styles: {
                                    marginLeft: 85,
                                    marginTop: 20
                                }
                            }
                        ]
                    },
                    styles: {
                        position: 'left',
                        background: Sprite.from(assets.bg),
                        maxWidth: '45%',
                        margin: 20,
                        scale: 0.5
                    }
                },
                {
                    id: 'right',
                    content: {
                        id: 'rightProgress',
                        content: [
                            {
                                id: 'hard',
                                content: Sprite.from(assets.hard),
                                styles: {
                                    position: 'left',
                                    marginLeft: -35
                                }
                            },
                            {
                                id: 'hardProgress',
                                content: new ProgressBar({
                                    bg: new Graphics().beginFill(0x000000, 0.0001).drawRect(0, 0, 355, 50).endFill(),
                                    fill: assets.fillPink,
                                    progress: this.params.health
                                }),
                                styles: {
                                    marginLeft: 85,
                                    marginTop: 20
                                }
                            }
                        ]
                    },
                    styles: {
                        position: 'right',
                        background: Sprite.from(assets.bg),
                        maxWidth: '45%',
                        margin: 20,
                        scale: 0.5
                    }
                }
            ],
            styles: {
                width: '100%'
            }
        });

        this.view.addChild(this.layout);
        this.resize(window.innerWidth, window.innerHeight);
    }

    resize(w: number, h: number)
    {
        this.layout?.resize(w, h);
    }
}

export const FitAndScale = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
