import { Layout } from '../../Layout';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Container } from '@pixi/display';
import { preloadAssets } from '../utils/helpers';
import { Sprite } from '@pixi/sprite';

const assets = {
    bg: 'verticalBG.png',
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
                    // this is the biggest content layout in terms of size,
                    // so parent size will be binded to it
                    // until it reaches 100% of its parent width or height
                    // then it will be scaled down to fit and proportionally adapt width or height accordingly
                    bg: Sprite.from(assets.bg),
                    // this are smaller content layouts,
                    // using the position property they will be positioned accordingly
                    // ! as they are absolute positioned, they will not affect auto size of the parent
                    // as "bg" layout dictates the size of the parent,
                    // this smaller layouts will be "binded" to its size and scale
                    // together with it when parent is scaled
                    topLeft: {
                        content: Sprite.from(assets.a1),
                        styles: {
                            position: 'topLeft'
                        }
                    },
                    topRight: {
                        content: Sprite.from(assets.a2),
                        styles: {
                            position: 'topRight'
                        }
                    },
                    bottomLeft: {
                        content: Sprite.from(assets.a3),
                        styles: {
                            position: 'bottomLeft'
                        }
                    },
                    bottomRight: {
                        content: Sprite.from(assets.a4),
                        styles: {
                            position: 'bottomRight'
                        }
                    },
                    center: {
                        content: Sprite.from(assets.a5),
                        styles: {
                            position: 'center'
                        }
                    },
                    centerTop: {
                        content: Sprite.from(assets.a5),
                        styles: {
                            position: 'centerTop'
                        }
                    },
                    centerRight: {
                        content: Sprite.from(assets.a1),
                        styles: {
                            position: 'centerRight'
                        }
                    },
                    centerLeft: {
                        content: Sprite.from(assets.a2),
                        styles: {
                            position: 'centerLeft'
                        }
                    },
                    centerBottom: {
                        content: Sprite.from(assets.a1),
                        styles: {
                            position: 'centerBottom'
                        }
                    }
                },
                styles: {
                    // no width and height set, so it will be controlled by the content
                    position: 'center',
                    maxHeight: '100%',
                    maxWidth: '100%'
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

export const FitAndPosition = (params: any) => new LayoutStory(params);

export default {
    title: 'Fit',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
