import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { preloadAssets } from '../utils/helpers';

const assets = {
    bg: 'bg.png',
    a1: 'avatar-01.png',
    a2: 'avatar-02.png',
    a3: 'avatar-03.png',
    a4: 'avatar-04.png',
    a5: 'avatar-05.png'
};

const args = {
    width: 80,
    height: 80
};

class LayoutStory
{
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor(props)
    {
        preloadAssets(Object.values(assets)).then(() => this.createLayout(props));
    }

    createLayout({ width, height }: any)
    {
        this.layout = new Layout({
            id: 'root',
            styles: {
                width: `${width}%`,
                height: `${height}%`,
                background: 'red',
                position: 'center',
                overflow: 'hidden'
            }
        });

        this.layout.addContent({
            back: {
                content: {
                    bg: {
                        content: Sprite.from(assets.bg),
                        styles: {
                            // no width and height set, so it will be controlled by the content
                            position: 'center',
                            maxWidth: '100%',
                            minHeight: '100%'
                        }
                    },
                    gameContent: {
                        content: {
                            topLeft: {
                                content: Sprite.from(assets.a1),
                                styles: {
                                    position: 'topLeft',
                                    maxWidth: 80,
                                }
                            },
                            topRight: {
                                content: Sprite.from(assets.a2),
                                styles: {
                                    position: 'topRight',
                                    maxWidth: 80,
                                }
                            },
                            bottomLeft: {
                                content: Sprite.from(assets.a3),
                                styles: {
                                    position: 'bottomLeft',
                                    maxWidth: 80,
                                }
                            },
                            bottomRight: {
                                content: Sprite.from(assets.a4),
                                styles: {
                                    position: 'bottomRight',
                                    maxWidth: 80,
                                }
                            },
                            center: {
                                content: Sprite.from(assets.a5),
                                styles: {
                                    position: 'center',
                                    maxWidth: 80,
                                }
                            },
                            centerTop: {
                                content: Sprite.from(assets.a5),
                                styles: {
                                    position: 'centerTop',
                                    maxWidth: 80,
                                }
                            },
                            centerRight: {
                                content: Sprite.from(assets.a1),
                                styles: {
                                    position: 'centerRight',
                                    maxWidth: 80,
                                }
                            },
                            centerLeft: {
                                content: Sprite.from(assets.a2),
                                styles: {
                                    position: 'centerLeft',
                                    maxWidth: 80,
                                }
                            },
                            centerBottom: {
                                content: Sprite.from(assets.a1),
                                styles: {
                                    position: 'centerBottom',
                                    maxWidth: 80,
                                }
                            }
                        },
                        styles: {
                            position: 'center',
                            width: 300,
                            height: '100%',

                            maxWidth: '100%',

                            minWidth: 240,
                            minHeight: 240,

                            aspectRatio: 'flex',
                        }
                    }
                },
                styles: {
                    // no width and height set, so it will be controlled by the content
                    position: 'center',
                    height: '100%',
                    width: '100%'
                }
            }
        });
        this.resize(this.w, this.h);

        this.view.addChild(this.layout);
    }

    resize(w: number, h: number)
    {
        this.w = w;
        this.h = h;

        this.layout?.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const ContainAndPosition = (params: any) => new LayoutStory(params);

export default {
    title: 'Fit',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
