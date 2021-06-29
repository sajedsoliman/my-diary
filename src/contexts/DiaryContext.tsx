import React, { createContext, useContext } from "react";

const diaryContext = createContext(null);

export const useDiary = () => {
	return useContext(diaryContext);
};

const DiaryContextProvider = ({ children, value }: { value: any; children: any }) => {
	return <diaryContext.Provider value={value}>{children}</diaryContext.Provider>;
};

export default DiaryContextProvider;
