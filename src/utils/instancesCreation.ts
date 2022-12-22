import { Sprite, Texture } from 'pixi.js';

export function sprite(texture: string) {
	return new Sprite(Texture.from(texture));
}
