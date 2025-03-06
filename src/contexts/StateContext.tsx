import React, { createContext, useState, useContext, ReactNode } from 'react';

interface StateContextType {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useStateContext = (): StateContextType => {
	const context = useContext(StateContext);
	if (!context) {
		throw new Error('useStateContext must be used within a StateProvider');
	}
	return context;
};

interface StateProviderProps {
	children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
	const [state, setState] = useState<string>('Initial state');

	return (
		<StateContext.Provider value={{ state, setState }}>
			{children}
		</StateContext.Provider>
	);
};
