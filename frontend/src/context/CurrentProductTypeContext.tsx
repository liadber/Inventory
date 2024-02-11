import {createContext, Dispatch, useContext, useReducer} from 'react';

export const CurrentProductTypeContext = createContext<string | null>(null);
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

function currentProductTypeReducer(currentType: string, action: { type: string, nextProductType: string }) {
    switch (action.type) {
        case 'changed': {
            return action.nextProductType
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialCurrentProductType = "Bike";

export function useCurrentProductType() {
    return useContext(CurrentProductTypeContext);
}

export function useCurrentProductTypeDispatch() {
    return useContext(CurrentProductTypeDispatchContext);
}
