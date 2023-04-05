import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';

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
                                    maxWidth: '20%',
                                }
                            },
                            topRight: {
                                content: Sprite.from(assets.a2),
                                styles: {
                                    position: 'topRight',
                                    maxWidth: '20%',
                                }
                            },
                            bottomLeft: {
                                content: Sprite.from(assets.a3),
                                styles: {
                                    position: 'bottomLeft',
                                    maxWidth: '20%',
                                }
                            },
                            bottomRight: {
                                content: Sprite.from(assets.a4),
                                styles: {
                                    position: 'bottomRight',
                                    maxWidth: '20%',
                                }
                            },
                            center: {
                                content: Sprite.from(assets.a5),
                                styles: {
                                    position: 'center',
                                    maxWidth: '20%',
                                }
                            },
                            centerTop: {
                                content: Sprite.from(assets.a5),
                                styles: {
                                    position: 'centerTop',
                                    maxWidth: '20%',
                                }
                            },
                            centerRight: {
                                content: Sprite.from(assets.a1),
                                styles: {
                                    position: 'centerRight',
                                    maxWidth: '20%',
                                }
                            },
                            centerLeft: {
                                content: Sprite.from(assets.a2),
                                styles: {
                                    position: 'centerLeft',
                                    maxWidth: '20%',
                                }
                            },
                            centerBottom: {
                                content: Sprite.from(assets.a1),
                                styles: {
                                    position: 'centerBottom',
                                    maxWidth: '20%',
                                }
                            }
                        },
                        styles: {
                            position: 'center',
                            width: 400,
                            height: 800,
                            maxWidth: '100%',
                            maxHeight: '100%',
                            minHeight: 800,
                            background: 'green',
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

export const GameLayout = (params: any) => new LayoutStory(params);

export default {
    title: 'Complex',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
