import {makeAutoObservable, runInAction} from "mobx";
import {UiStore} from "@store";
import {AppApi, IAppApi} from "@api";

type TConnectionStatus = 'CONNECTING' | 'READY' | 'FETCHING_USER_DETAILS' | 'FETCHING_DATA';

export class RootStore {

    connectionStatus: TConnectionStatus;
    appApi: IAppApi;
    uiStore: UiStore;

    constructor() {
        this.setConnectionStatus('CONNECTING');
        makeAutoObservable(this)
    }

    public async init(): Promise<void> {
        this.appApi = AppApi.getInstance(this)
        this.uiStore = new UiStore()
        await this.appApi.init()
    }

    public async fetchData(): Promise<void> {
        runInAction(() => {
            this.setConnectionStatus('FETCHING_DATA')
        })
    }

    private setConnectionStatus(status: TConnectionStatus) {
        this.connectionStatus = status;
    }
}


