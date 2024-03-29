type Types = { [name: string]: object | number | string | boolean | Array<any>};

const controls = {
    select: {
        control: {
            type: 'select',
        },
    },
    check: {
        control: {
            type: 'check',
        },
    },
    color: {
        control: {
            type: 'color',
        },
    },
    count: {
        control: {
            type: 'range',
        },
    },
    type: {
        control: {
            type: 'radio',
        },
    },
    date: {
        control: {
            type: 'date',
        },
    },
    switch: {
        control: {
            type: 'boolean',
        },
    },
};

export const argTypes = (args: Types) =>
{
    const exportArgTypes: any = {};

    for (const key in args)
    {
        if (typeof args[key] === 'number')
        {
            let min = 0;

            const number = args[key] as number;

            if (key.includes('font') || key.includes('amount'))
            {
                min = 1;
            }

            if (number >= 0)
            {
                if (number >= 100)
                {
                    exportArgTypes[key] = {
                        control: {
                            type: 'range',
                            min,
                            max: 1000,
                            step: 10,
                        },
                    };
                }
                else if (number > 10)
                {
                    exportArgTypes[key] = {
                        control: {
                            type: 'range',
                            min,
                            max: 100,
                            step: 1,
                        },
                    };
                }
                else if (number <= 1)
                {
                    exportArgTypes[key] = {
                        control: {
                            type: 'range',
                            min,
                            max: 1,
                            step: 0.1,
                        },
                    };
                }
                else
                {
                    exportArgTypes[key] = {
                        control: {
                            type: 'range',
                            min,
                            max: 10,
                            step: 1,
                        },
                    };
                }
            }
            else if (number <= -100)
            {
                exportArgTypes[key] = {
                    control: {
                        type: 'range',
                        min: -1000,
                        max: 1000,
                        step: 10,
                    },
                };
            }
            else if (number < -10)
            {
                exportArgTypes[key] = {
                    control: {
                        type: 'range',
                        min: -100,
                        max: 100,
                        step: 10,
                    },
                };
            }
            else if (number >= -1)
            {
                exportArgTypes[key] = {
                    control: {
                        type: 'range',
                        min: -1,
                        max: 0,
                        step: 0.1,
                    },
                };
            }
            else
            {
                exportArgTypes[key] = {
                    control: {
                        type: 'range',
                        min: -10,
                        max: 10,
                        step: 1,
                    },
                };
            }
        }
        else
        {
            if (getArgType(key))
            {
                exportArgTypes[key] = getArgType(key);
            }

            switch (typeof args[key])
            {
                case 'object':
                    exportArgTypes[key] = {};

                    exportArgTypes[key] = { ...controls.select };

                    if (Array.isArray(args[key]))
                    {
                        exportArgTypes[key].options = args[key];
                    }
                    else
                    {
                        exportArgTypes[key].options = Object.keys(args).map(
                            (key) => args[key],
                        );
                    }
                    break;
                case 'boolean':
                    exportArgTypes[key] = controls.switch;
                    break;
            }
        }
    }

    return exportArgTypes;
};

function getArgType(type: string)
{
    for (const control in controls)
    {
        if (type.toLowerCase().indexOf(control) > -1)
        {
            // const keys = type.split(control);

            // if (options[keys[0]]) {
            //     argTypes[key].options = options[keys[0]];
            // }

            return (controls as any)[control];
        }
    }

    return undefined;
}

export const getDefaultArgs = (args: Types) =>
{
    const exportArgs: any = {};

    for (const key in args)
    {
        switch (typeof args[key])
        {
            case 'object':
                if (Array.isArray(args[key]))
                {
                    exportArgs[key] = (args as any)[key][0] as any;
                }
                break;
            default:
                exportArgs[key] = args[key];
        }
    }

    return exportArgs;
};
