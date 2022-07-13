import React from 'react';

// Import custom render function and built-in methods
import  { render, fireEvent, screen } from '../tools/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import DeckContainer from './pages/deckContainer/DeckContainer';
import Spinner from './components/spinner/Spinner';
import Header from './components/header/Header';


describe('initial load', () => {

    test('header should display "log-in or sign up"', () => {
        render(<Router><Header /></Router>)

        expect(screen.getByText(/~ log in ~ ~ sign up ~/i)).toBeInTheDocument()
    });

    test('should display spinner while fetching public decks', () => {
        render(<Router><Spinner /></Router>)

        expect(screen.getByTestId('spinner')).toBeInTheDocument()
    });

    test('after fetching public decks, should display "public library" title', async () => {
        render(<Router><DeckContainer /></Router>)

        expect(await screen.findByText(/public library/i)).toBeInTheDocument()
    })

    test('after fetching, should display public decks', async () => {
        render(<Router><DeckContainer /></Router>)

        expect(await screen.findAllByTestId('deck')).toHaveLength(2)
    })
})

describe('log in', () => {
    test('upon clicking "log in/sign up" should render login page', async () => {
        render(<App />)

        fireEvent.click(screen.getByTestId('login-link'))
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    })

    test('upon valid login, should display spinner', async () => {
        render(<App />)

        fireEvent.click(screen.getByTestId('login-link'))
        fireEvent.change(screen.getByTestId('login-name-input'), {name: 'first'})
        fireEvent.change(screen.getByTestId('login-password-input'), {password: 'first'})
        fireEvent.click(screen.getByRole('button', {name: /submit/i}))
        expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })
})
