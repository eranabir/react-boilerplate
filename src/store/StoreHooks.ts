import React from 'react';
import {
    RootStore,
    IStoreContext,
    StoreContext,
    UiStore,
} from "@store";

export function useRootStore(): RootStore {
    const appContextValue = React.useContext<IStoreContext>(StoreContext);
    return appContextValue.rootStore;
}

export const useUiStore = (): UiStore => {
    return useRootStore().uiStore
}



