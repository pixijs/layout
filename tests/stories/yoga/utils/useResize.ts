import { useEffect } from 'react';

export function useResize(callback: () => void) {
    useEffect(() => {
        const handleResize = () => {
            callback();
        };

        window.addEventListener('resize', handleResize);

        // initial resize
        callback();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [callback]);
}
