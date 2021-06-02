import axios, {AxiosInstance} from 'axios';
import {IAppApi} from "@api";
import {RootStore} from "@store";


export class AppApi implements IAppApi {

    private static instance: AppApi;
    appAxios: AxiosInstance

    constructor(private rootStore: RootStore) {

    }

    async init(): Promise<void> {
        this.appAxios = axios.create({
            baseURL:process.env.APP_API_BASE_URL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        this.appAxios.interceptors.response.use((res) => res, async (e) => {
            if (e.message === 'Network Error') {
                localStorage.clear()
            }
            throw e
        })
    }

    static getInstance(rootStore: RootStore): AppApi {
        if (!this.instance) {
            this.instance = new AppApi(rootStore)
        }
        return this.instance
    }

}