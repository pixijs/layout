import { useCallback, useEffect } from 'react';

import type React from 'react';

export const useResizeHandler = (
    showPreview: boolean,
    setCodeVisibility: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const handleResize = useCallback(() => {
        if (window.innerWidth < 1200) {
            setCodeVisibility(false);
        } else {
            setCodeVisibility(showPreview);
        }
    }, [showPreview, setCodeVisibility]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Call handler right away so state gets updated with initial window size

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);
};
