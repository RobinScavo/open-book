import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Welcome from '../Welcome.js';

describe('Should render welcome screen', () => {
    render(<Router><Welcome /></Router>)

    test('Should render all text fields and start button', () => {
        expect(screen.getByText(/Welc/i)).toBeInTheDocument();
        expect(screen.getByText("O")).toBeInTheDocument();
        expect(screen.getByText(/me/i)).toBeInTheDocument();
        expect(screen.getByText(/to openbook!/i)).toBeInTheDocument();
        expect(screen.getByText(/Feel free to browse the public decks as a guest. When you're ready to build your own, create an account and begin./i)).toBeInTheDocument();
        expect(screen.getByText(/If you wish to make changes to a public deck, use the 'upload' option to create a copy in your private library. Enjoy!/i)).toBeInTheDocument();

        const linkEl = (screen.getByRole('link', { name: "Let's go!"}));
        expect(linkEl).toBeInTheDocument();
        expect(linkEl).toHaveAttribute('href', '/decks');
    })
})
