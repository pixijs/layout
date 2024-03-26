import { Layout } from "../../Layout";
import { argTypes, getDefaultArgs } from "../utils/argTypes";
import { Container } from "pixi.js";
import { preloadAssets } from "../utils/helpers";
import { Texture, NineSliceSprite } from "pixi.js";
import { LOREM_TEXT } from "../../utils/constants";

const args = {
    width: 97,
    height: 76,
};

const testAssets = {
    ribbon: "Window/Ribbon.png",
    window: "Window/SmallWindow.png",
    substrate: "Window/SmallSubstrate.png",
};

class LayoutStory {
    private layout: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor(props: typeof args) {
        preloadAssets(Object.values(testAssets)).then(() =>
            this.createLayout(props)
        );
    }

    createLayout(props: typeof args) {
        const titleTexture = Texture.from(testAssets.ribbon);
        const titleBG = new NineSliceSprite({
            texture: titleTexture,
            leftWidth: 315,
            topHeight: 64,
            rightWidth: 112,
            bottomHeight: 73,
        });

        const windowTexture = Texture.from(testAssets.window);
        const windowBG = new NineSliceSprite({
            texture: windowTexture,
            leftWidth: 315,
            topHeight: 64,
            rightWidth: 112,
            bottomHeight: 73,
        });

        const substrateTexture = Texture.from(testAssets.substrate);
        const substrateBG = new NineSliceSprite({
            texture: substrateTexture,
            leftWidth: 400,
            topHeight: 64,
            rightWidth: 400,
            bottomHeight: 73,
        });

        // Component usage
        this.layout = new Layout({
            id: "root",
            content: {
                window: {
                    content: {
                        substrate: {
                            content: {
                                text: {
                                    content: `${LOREM_TEXT} ${LOREM_TEXT} ${LOREM_TEXT} ${LOREM_TEXT} ${LOREM_TEXT}`,
                                    styles: {
                                        width: "95%",
                                        height: "90%",
                                        color: 0x000000,
                                        fontSize: 22,
                                        textAlign: "left",
                                        verticalAlign: "top",
                                        wordWrap: true,
                                        overflow: "hidden",
                                        paddingTop: 50,
                                        paddingLeft: 40,
                                    },
                                },
                            },
                            styles: {
                                width: "90%",
                                height: "70%",
                                background: substrateBG,
                                position: "center",
                            },
                        },
                        title: {
                            content: "Title",
                            styles: {
                                color: 0xffffff,
                                fontSize: 44,
                                dropShadow: true,
                                dropShadowColor: 0x000000,
                                dropShadowBlur: 4,
                                dropShadowDistance: 0,
                                dropShadowAlpha: 0.5,
                                textAlign: "center",
                                width: "70%",
                                height: titleBG.height,
                                background: titleBG,
                                position: "topCenter",
                                marginTop: -49,
                            },
                        },
                    },
                    styles: {
                        width: "100%",
                        height: "100%",
                        background: windowBG,
                        position: "bottomCenter",
                    },
                },
            },
            styles: {
                width: `${props.width}%`,
                height: `${props.height}%`,
                position: "center",
            },
        });

        this.layout.resize(this.w, this.h);
        this.view.addChild(this.layout);
    }

    resize(w: number, h: number) {
        this.w = w;
        this.h = h;

        this.layout?.resize(w, h);
    }
}

export const UsingNineSliceSprite = (params: any) => new LayoutStory(params);

export default {
    title: "Complex",
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
