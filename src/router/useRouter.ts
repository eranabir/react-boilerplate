import {useLocation, useParams, useHistory, useRouteMatch} from '@router';
import queryString from 'query-string';

interface IUseRouter {
    query: queryString.ParsedQuery
    params: any
    location: any
    history: any
    navigateTo: ({
                     to,
                     params,
                     match,
                     mode,
                     data
                 }: { to: string, params?: { [key: string]: string }, match?: boolean, mode?: 'push' | 'replace', data?: any }) => void
    url: string;
}

export const useRouter = (): IUseRouter => {

    const params = useParams()
    const location = useLocation()
    const history = useHistory()
    const {url} = useRouteMatch()
    const query = queryString.parse(location.search)
    const navigateTo = ({to, params = null, match = false, mode = 'push', data = {}}) => {

        const search = params ? Object.keys(params).reduce((acc, current) => {

            let str = acc + `${current}=${params[current]}`
            if (Object.keys(params).length > 0) {
                str += '&'
            }
            return str

        }, '?') : null
        history[mode]({pathname: `${match ? url : ''}${to}`, state: data, search})
    }

    return {
        query,
        params,
        location,
        history,
        navigateTo,
        url
    }

}
