import { NineSliceSprite, Texture } from "pixi.js";
import { Layout } from "../../Layout";
import { argTypes, getDefaultArgs } from "../utils/argTypes";
import { Container } from "pixi.js";
import { ALIGN, BACKGROUND_SIZE } from "../../utils/constants";
import { preloadAssets } from "../utils/helpers";
import { Sprite } from "pixi.js";

const TEXTS = [
    "Width and height values are set in pixels.",
    "Text will adapt to the layout size.",
    'When type is set to NineSliceSprite backgroundSize is set to "stretch" by default.',
];

const args = {
    type: ["NineSliceSprite", "Sprite"],
    text: TEXTS.join("\n\n"),
    width: 350,
    height: 350,
    padding: 35,
    textAlign: ALIGN,
    wordWrap: true,
    backgroundSize: BACKGROUND_SIZE,
};

const assets = {
    background: "Window/SmallSubstrate.png",
    NineSliceSprite: "Progress/ValueBG.png",
};

class LayoutStory {
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();
    w: number;
    h: number;

    constructor(props) {
        preloadAssets(Object.values(assets)).then(() =>
            this.createLayout(props)
        );
    }

    private createLayout({
        type,
        textAlign,
        width,
        height,
        padding,
        text,
        wordWrap,
        backgroundSize,
    }: any) {
        let background: Sprite | NineSliceSprite;

        if (type === "NineSliceSprite") {
            const substrateTexture = Texture.from(assets.NineSliceSprite);

            background = new NineSliceSprite(substrateTexture, 53, 50, 53, 56);
        } else {
            background = Sprite.from(assets.background);
        }

        this.layout = new Layout({
            id: "root",
            content: text,
            styles: {
                background,
                width,
                height,
                padding,
                overflow: "hidden",
                // text options
                textAlign,
                fontSize: 24,
                position: "center",
                borderRadius: 20,
                wordWrap,
                backgroundSize,
            },
        });

        this.layout.resize(this.w, this.h);
        this.view.addChild(this.layout);
    }

    resize(w: number, h: number) {
        this.w = w;
        this.h = h;

        this.layout?.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const BySetSize = (params: any) => new LayoutStory(params);

export default {
    title: "AutoSize",
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
