import {createContext, Dispatch, useContext, useReducer} from 'react';
import {ProductStatistics} from "../types/ProductStatistics";

export const CurrentProductStatisticsContext= createContext<ProductStatistics | null>(null);
export const CurrentProductStatisticsDispatchContext = createContext<Dispatch<any> | null>(null);

export function CurrentProductStatisticsContextProvider({children}: any) {
    const [currentProductType, dispatch] = useReducer(
        currentProductTypeReducer,
        initialCurrentProductType
    );

    return (
        <CurrentProductStatisticsContext.Provider value={currentProductType}>
            <CurrentProductStatisticsDispatchContext.Provider value={dispatch}>
                {children}
            </CurrentProductStatisticsDispatchContext.Provider>
        </CurrentProductStatisticsContext.Provider>
    );
}

function currentProductTypeReducer(currentProductStatistics: ProductStatistics, action: { type: string, nextProductStatistics: ProductStatistics }) {
    switch (action.type) {
        case 'changed': {
            return {...action.nextProductStatistics}
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialCurrentProductType: ProductStatistics = {type: '', quantity: 0};

export function useCurrentProductStatistics() {
    return useContext(CurrentProductStatisticsContext);
}

export function useCurrentProductStatisticsDispatch() {
    return useContext(CurrentProductStatisticsDispatchContext);
}
