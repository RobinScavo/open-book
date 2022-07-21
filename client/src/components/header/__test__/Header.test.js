import { render, screen } from '../../../../tools/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';

import Header from '../Header';


describe('Header Component', () => {

    test('should render nav button and log in link', () => {
        render(<Router><Header /></Router>)

        expect(screen.getByRole('button', {ariaLabel: /site navigation/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {ariaLabel: /log in link/i})).toBeInTheDocument();
    })

})
