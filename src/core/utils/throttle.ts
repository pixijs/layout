const throttleMap = new Map<
    (...params: any[]) => void,
    { throttledFunction: (...params: any[]) => void; args: any[] | null }
>();

/**
 * Lets you call a function and have it throttled by a certain delay.
 * Useful for when a function may be spammed!
 *
 * @example
 * ```
 * function resize(w, h){
 *  console.log('resized', w, h);
 * }
 *
 * window.onResize = ()=>{
 *  throttle(resize, 100)(window.innerWidth, window.innerHeight);
 * }
 * ```
 *
 * @param fun - the function you want throttled
 * @param delay - how long until the function is executed
 */
export function throttle(fun: (...params: any[]) => void, delay = 100, scope?: any): (...params: any[]) => void {
    if (!throttleMap.has(fun)) {
        let timerId: NodeJS.Timeout | number | null = null;

        const throttledFunction = (...args: any): void => {
            throttleMap.get(fun)!.args = args;

            if (timerId) return;

            const callFun = (): void => {
                timerId = null;

                const latestArgs = throttleMap.get(fun)!.args;

                if (scope) {
                    fun.call(scope, ...latestArgs!);
                } else {
                    fun(...latestArgs!);
                }
            };

            if (delay === 0) {
                callFun();
            } else {
                timerId = setTimeout(callFun, delay);
            }
        };

        throttleMap.set(fun, { throttledFunction, args: null });
    }

    return throttleMap.get(fun)!.throttledFunction;
}
