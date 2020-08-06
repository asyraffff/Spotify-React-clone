import React from 'react';
import { createContext, useContext, useReducer } from 'react';

// preparing the data layer
export const DataLayerContext = createContext();

// wrapper in index.js
export const DataLayer = ({
    initialState,
    reducer,
    children
}) => (
        <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </DataLayerContext.Provider>
    )

// children is what we wrap in DataLayer
// in our case , children => app


// step to get the case and state in initialState and reducer that in datalayer
export const useDataLayerValue = () => useContext(DataLayerContext);
