import { Assets } from "pixi.js";

export async function preloadAssets(assets: string[]): Promise<void> {
    await Assets.load(assets);
}
