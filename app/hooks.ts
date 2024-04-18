import { useEffect, useRef } from "react";

// callback for unmount runs with actual state
export const useUnmount = (callback: () => void) => {
	const callbackRef = useRef(callback);
	callbackRef.current = callback;
	useEffect(() => {
		return () => {
			callbackRef.current();
		};
	}, []);
};
