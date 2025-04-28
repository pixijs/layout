import { useCallback, useMemo } from 'react';
import V8IndexFile from '!!raw-loader!../examples/container';

import type { IVersion } from './usePixiVersions';
import type { SetURLStateType } from '@site/src/components/Playground/PixiPlayground/usePlaygroundURLState';

export const defaultExampleId = 'sprite.basic';

type UseCodeExamplesParams = {
    urlState: string | undefined;
    setURLState: SetURLStateType;
    pixiVersion: IVersion;
};

export const useCodeExamples = ({ urlState, setURLState, pixiVersion }: UseCodeExamplesParams) => {
    const version = pixiVersion.versionLabel;
    const hasUrlHashed = Boolean(urlState);

    const { indexCode } = useMemo<{
        indexCode: string;
    }>(() => {
        if (!urlState) {
            // versionLabel
            const indexCode = V8IndexFile;

            return {
                indexCode,
            };
        }

        return {
            indexCode: urlState,
        };
    }, [version, urlState]);

    const handleEditorCodeChanged = useCallback(
        (nextSourceCode: string | undefined) => {
            if (!nextSourceCode) return;

            // pushState only when editing code for the first time
            setURLState(
                {
                    state: nextSourceCode,
                },
                !hasUrlHashed,
            );
        },
        [hasUrlHashed, setURLState],
    );

    return {
        indexCode,
        handleEditorCodeChanged,
    };
};

export function extractSource(source: string | Record<string, string>) {
    const isMultiFile = typeof source !== 'string';
    const indexCode = isMultiFile ? source.index : source;
    const extraFiles = isMultiFile
        ? Object.fromEntries(Object.entries(source).filter(([key]) => key !== 'index'))
        : undefined;

    return {
        indexCode,
        extraFiles,
    };
}
