import { render, screen } from '../../../../tools/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import Header from '../Header';


describe('Header Component', () => {

    test('renders Header component without errors', () => {
        render(<Router><Header /></Router>)

        expect(screen.getByTestId('header-container')).toBeInTheDocument();
    })

    test('should render nav button and log in link', () => {
        render(<Router><Header /></Router>)

        expect(screen.getByTestId('navigation-button')).toBeInTheDocument();
        expect(screen.getByTestId('login-link')).toBeInTheDocument();
    })

})
