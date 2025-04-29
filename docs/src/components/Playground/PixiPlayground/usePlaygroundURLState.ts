import { evolve, isNil, unless } from 'ramda';
import { useURLStateParams } from '@site/src/hooks/useURLStateParams';

import type { DeserializeParamsType, SerializeParamsType, SetStateType } from '@site/src/hooks/useURLStateParams';

type URLStateParams = {
    state?: string;
};

function encodeState(state: string) {
    const json = JSON.stringify(state);

    return btoa(json);
}

function decodeState(encodedState: string) {
    try {
        const state: string = JSON.parse(atob(encodedState));

        return state;
    } catch {
        return undefined;
    }
}

const safeEncodeState = unless(isNil, encodeState);
const safeDecodeState = unless(isNil, decodeState);

const serializeParams = evolve({
    state: safeEncodeState,
}) as SerializeParamsType<URLStateParams>;

const deserializeParams = evolve({
    state: safeDecodeState,
}) as DeserializeParamsType<URLStateParams>;

export type SetURLStateType = SetStateType<URLStateParams>;

export const usePlaygroundURLState = () =>
    useURLStateParams<URLStateParams>(
        (urlState) => {
            const { state } = urlState;

            return {
                state: state ?? undefined,
            };
        },
        serializeParams,
        deserializeParams,
    );
