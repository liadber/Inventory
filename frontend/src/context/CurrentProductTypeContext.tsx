import {createContext, Dispatch, useContext, useReducer} from 'react';

export const CurrentProductTypeContext = createContext<{ type: string, quantity: number } | null>(null);
export const CurrentProductTypeDispatchContext = createContext<Dispatch<any> | null>(null);

export function CurrentProductTypeContextProvider({children}: any) {
    const [currentProductType, dispatch] = useReducer(
        currentProductTypeReducer,
        initialCurrentProductType
    );

    return (
        <CurrentProductTypeContext.Provider value={currentProductType}>
            <CurrentProductTypeDispatchContext.Provider value={dispatch}>
                {children}
            </CurrentProductTypeDispatchContext.Provider>
        </CurrentProductTypeContext.Provider>
    );
}

function currentProductTypeReducer(currentType: { type: string, quantity: number }, action: { type: string, nextProductType: { type: string, quantity: number } }) {
    switch (action.type) {
        case 'changed': {
            return {...action.nextProductType}
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialCurrentProductType: { type: string, quantity: number } = { type: '', quantity: 0 };

export function useCurrentProductType() {
    return useContext(CurrentProductTypeContext);
}

export function useCurrentProductTypeDispatch() {
    return useContext(CurrentProductTypeDispatchContext);
}
