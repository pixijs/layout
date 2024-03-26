import { Container } from "pixi.js";
import { Layout } from "../../Layout";
import { argTypes, getDefaultArgs } from "../utils/argTypes";
import { ALIGN } from "../../utils/constants";

const args = {
    text:
        `Width and height properties are not set (it is 'auto').\n\n` +
        `The 'display' property is set to 'inline' or 'inline-Block'.\n\n` +
        `The size of the layout will change based on the internal text size.`,
    padding: 20,
    fontSize: 24,
    textAlign: ALIGN,
    wordWrap: true,
};

class LayoutStory {
    private layout: Layout;
    private toolTip: Layout;
    view = new Container();

    constructor({ text, padding, fontSize, wordWrap, textAlign }: any) {
        this.layout = new Layout({
            id: "root",
            content: text,
            styles: {
                background: "black",
                color: "white",
                position: "center",
                borderRadius: 20,
                padding,
                fontSize,
                wordWrap,
                textAlign,
                maxWidth: "100%",
                maxHeight: "100%",
            },
        });

        this.view.addChild(this.layout);
    }

    resize(w: number, h: number) {
        this.layout.resize(w, h);
        this.toolTip?.resize(w, h);
    }
}

export const ByText = (params: any) => new LayoutStory(params);

export default {
    title: "AutoSize",
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};
