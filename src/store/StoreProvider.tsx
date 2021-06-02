import React, { createContext } from 'react';
import {RootStore} from "@store";

export interface IStoreContext {
    rootStore: RootStore;
}

export const StoreContext = createContext<IStoreContext>(null)

const rootStore = new RootStore()
rootStore.init()

export const MobxProvider: React.FC = ({children}) => {
    return <StoreContext.Provider value={{ rootStore }}>{children}</StoreContext.Provider>;
};
