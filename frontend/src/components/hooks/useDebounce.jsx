import { useEffect, useState } from "react";

export function useDebounce (input, timeout) {
    const [debounceValue, setDebounceValue] = useState(input)
    useEffect(() => {
        const initialValue = setTimeout(() => {
            setDebounceValue(input)
        },timeout)

        return () => {
            clearInterval(initialValue);
        }

    }, [input])

    return debounceValue;
}