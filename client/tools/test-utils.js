import React from 'react';
import { render as rtlRender} from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


import authReducer from '../src/redux/auth/authSlice';
import decksReducer from '../src/redux/decks/decksSlice'


function render (
    ui,
    {
        preloadedState,
        store = configureStore({
            reducer: {
              auth: authReducer,
              decks: decksReducer
            }
        }),
        ...renderOptions
    } = {}
    ) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

// re-export everyhting
export * from '@testing-library/react'
// override render method
export { render }
