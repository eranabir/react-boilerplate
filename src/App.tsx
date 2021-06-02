import React from 'react';
import {AppTheme} from "@foundation";
import {MobxProvider} from "@store";
import {i18Init} from "@utils";
import {AppRouter} from "@router";
i18Init()

const App = (): JSX.Element => {
    return (
        <AppTheme>
            <MobxProvider>
              <AppRouter/>
            </MobxProvider>
        </AppTheme>
    )
}

export default App