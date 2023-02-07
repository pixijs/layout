import { FancyButton, ProgressBar, ScrollBox } from '@pixi/ui';
import { Layout } from '../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { preloadAssets } from '../utils/helpers';

const args = {
    health: 50
};

const assets = {
    bg: 'Progress/SmallPprogresBarBG.png',
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
                    id: 'left',
                    content: {
                        id: 'life',
                        content: [
                            {
                                id: 'lifeProgress',
                                content: new ProgressBar({
                                    bg: assets.bg,
                                    fill: assets.fillPink,
                                    progress: this.params.health,
                                    fillOffset: {
                                        x: 30,
                                        y: -8
                                    }
                                })
                            },
                            {
                                id: 'hard',
                                content: Sprite.from(assets.hard),
                                styles: {
                                    position: 'left',
                                    marginLeft: -35,
                                    marginTop: 5
                                }
                            }
                        ],
                        styles: {
                            margin: 10,
                            marginLeft: 30
                        }
                    },
                    styles: {
                        width: '50%',
                        height: '100%',
                        position: 'left',
                        background: 'red'
                    }
                },
                {
                    id: 'right',
                    content: {
                        id: 'energy',
                        content: [
                            {
                                id: 'energyProgress',
                                content: new ProgressBar({
                                    bg: assets.bg,
                                    fill: assets.fillBlue,
                                    progress: this.params.health,
                                    fillOffset: {
                                        x: 30,
                                        y: -8
                                    }
                                })
                            },
                            {
                                id: 'energy',
                                content: Sprite.from(assets.energy),
                                styles: {
                                    position: 'left',
                                    marginLeft: -15,
                                    marginTop: -5
                                }
                            }
                        ],
                        styles: {
                            position: 'right',
                            margin: 10,
                            marginRight: 20
                        }
                    },
                    styles: {
                        width: '50%',
                        height: '100%',
                        position: 'right',
                        background: 'green'
                    }
                }
            ],
            styles: {
                width: '100%',
                height: '100%'
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

export const GamePlayUI = (params: any) => new LayoutStory(params);

export default {
    title: 'Layout',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
