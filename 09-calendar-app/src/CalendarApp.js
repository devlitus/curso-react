import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRoute } from './router/AppRoute'

export const CalendarApp = () => {
    return (
        <Provider store= {store}>
            <AppRoute />
        </Provider>
    )
}
