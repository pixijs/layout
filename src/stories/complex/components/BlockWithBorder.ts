import { Layout } from '../../../Layout';

export class BlockWithBorder extends Layout
{
    constructor(title: string)
    {
        super({
            content: {
                bet: {
                    content: title,
                    styles: {
                        fontFamily: 'BlenderPro',
                        fontSize: 12,
                        color: 0xa8ffef,
                        landscape: {
                            display: 'block',
                            marginTop: 0,
                            marginLeft: 0,
                        },
                        portrait: {
                            display: 'inline',
                            marginTop: 17,
                            marginLeft: 20,
                        },
                    },
                },
                betInput: {
                    content: {
                        betInput: {
                            content: 'BetInput',
                            styles: {
                                width: '100%',
                                height: '100%',
                                marginLeft: 10,
                                marginTop: 2,
                            },
                        },
                    },
                    styles: {
                        background: 'yellow',
                        width: '100%',
                        height: '100%',
                        landscape: {
                            marginLeft: 0,
                        },
                        portrait: {
                            marginLeft: 20,
                        },
                    },
                },
            },
            styles: {
                height: 50,
                width: '100%',
                marginTop: 70,
                position: 'centerTop',
                landscape: {
                    position: 'centerTop',
                    width: '90%',
                    maxWidth: '90%',
                },
                portrait: {
                    position: 'leftTop',
                    width: '52%',
                    maxWidth: '52%',
                },
            },
        });
    }
}
