import { Container } from '@pixi/display';

type Elements = Map<string, Container>;

export class SelectController
{
    private _tree: Map<string, Elements>;

    private _list: Map<string, Container>;

    private static _instance: SelectController;

    private constructor()
    {
        this._list = new Map();
        this._tree = new Map();
    }

    static get instance(): SelectController
    {
        if (!this._instance)
        {
            this._instance = new this();
        }

        return this._instance;
    }

    add(container: Container, parentID: string, id?: string)
    {
        if (!this._tree.has(parentID))
        {
            this._tree.set(parentID, new Map());
        }

        const parent = this._tree.get(parentID);

        if (id)
        {
            if (parent.has(id))
            {
                throw new Error(`Element with id ${id} already exists in parent ${parentID}`);
            }

            parent.set(id, container);
            this._list.set(id, container);
        }
        else
        {
            parent.set(`${parentID}>${parent.size}`, container);
            this._list.set(`${parentID}>${parent.size}`, container);
        }
    }

    get(id: string): Container
    {
        return this._list.get(id);
    }

    get list(): Container[]
    {
        return Array.from(this._list.values());
    }
}
