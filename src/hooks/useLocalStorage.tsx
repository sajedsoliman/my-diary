import { useState } from "react";

function getInitialValue(key: string, initialValue: any) {
	const jsonValue = localStorage.getItem(key);
	if (jsonValue != null) return JSON.parse(jsonValue);

	if (typeof initialValue === "function") return initialValue();

	return initialValue;
}

export default function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
	// start
	const [storedValue, setStoredValue] = useState<T>(getInitialValue(key, initialValue));

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function so we have same API as useState
			// value(storedValue) like => ((prev:storedValue) => any):value
			// value is the function. storedValue is the prev param we're used to use
			const valueToStore = value instanceof Function ? value(storedValue) : value;

			// Save state
			setStoredValue(valueToStore);

			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue];
}
