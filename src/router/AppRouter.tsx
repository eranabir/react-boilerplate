import React from 'react';
import { BrowserRouter, Switch,Route} from '@router';
import {observer} from "mobx-react";
import {TestPage} from "@pages";

export const AppRouter = observer((): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={TestPage}/>
            </Switch>
        </BrowserRouter>
    )
})
