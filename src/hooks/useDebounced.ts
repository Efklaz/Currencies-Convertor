import {useCallback, useRef} from "react";

export default function useDebounced(callback:any, delay:number){
    const timer = useRef();
    const debounced = useCallback((...args:any[])=>{
        clearTimeout(timer.current);
        // @ts-ignore
        timer.current = setTimeout(()=>{
            callback(...args);
        }, delay);
    },[callback, delay]);
    return debounced;
}