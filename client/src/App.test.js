import React from 'react';

// Import custom render function and built-in methods
import  { render, waitFor, screen } from '../tools/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import  userEvent from  "@testing-library/user-event";

import App from './App';
import DeckContainer from './pages/deckContainer/DeckContainer';
import Spinner from './components/spinner/Spinner';
import Header from './components/header/Header';
import Welcome from './components/welcome/Welcome';
import Footer from './components/footer/Footer';
import { act } from 'react-dom/test-utils';


describe('end to end test', () => {

    test('user can navigate past welcome screen', async () => {
        render(<App />)

        const startButton = screen.getByRole('link', { name: "Let's go!"});
        userEvent.click(startButton);

        await waitFor(() => {
            expect(screen.getByText(/public library/i)).toBeInTheDocument();
            expect(screen.getByText(/log in/i)).toBeInTheDocument();
        })
    })

    test('Log in and sign up buttons work correctly', async () => {
        render(<App />)

        const logInButton = (screen.getByTestId(/login-link/i))
        userEvent.click(logInButton);

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/enter a password/i)).toBeInTheDocument();
        })

        const signUpButton = (screen.getByRole('link', { name: /sign up/i}))
        userEvent.click(signUpButton);

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/enter a password/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
        })
    })

    // test('Public decks are initially displayed', () => {

    // })
})

// describe('test', () => {
//     test('clicking the log in button displays log in page', async () => {
//         render(<App />)

//         const startButton = screen.getByRole('link', { name: "Let's go!"});
//         userEvent.click(startButton);

//         await waitFor(() => {
//             expect(screen.getByText(/public library/i)).toBeInTheDocument();
//             expect(screen.getByText(/log in/i)).toBeInTheDocument();
//         })
//     })

// })
