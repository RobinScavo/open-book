import Deck from '../Deck';
import { mockDeck, thirdMockDeck, checkProps } from "../../../../tools/utils";
import { render, screen } from '@testing-library/react';

describe('Deck', () => {
    describe('Checking Proptypes', () => {

        test('Should not throw a warning', () => {
            const expectedProps = {
                deck: mockDeck,
                userLocation: 'privateDecks'
            }

            const propsErr = checkProps(Deck, expectedProps)
            expect(propsErr).toBeUndefined();
        });
    });

    describe('Deck should render correctly for public decks', () => {
        beforeEach(() => render(<Deck deck={mockDeck} userLocation='publicDecks' />))

        test('Should have a subject, title and author', () => {
            expect(screen.getByText(/test author/i)).toBeInTheDocument();
            expect(screen.getByText(/react/i)).toBeInTheDocument();
            expect(screen.getByText(/test title/i)).toBeInTheDocument();
        })

        test('Should have uploads and cards but NOT published', () => {
            expect(screen.queryByText(/published/i)).toBeNull();
            expect(screen.getByText(/uploads/i)).toBeInTheDocument();
            expect(screen.getByText(/cards/i)).toBeInTheDocument();
            expect(screen.getByTestId(/uploads/i)).toHaveTextContent(6);
            expect(screen.getByTestId(/cards/i)).toHaveTextContent(2);
        })

        test('Should have correct icon styling', () => {
            expect(screen.getByTestId(/icon-background/i)).toHaveStyle({
                background: 'var(--black-color)',
                top: '7px',
                left: '8px',
                height: '100px',
                width: '100px',
                borderRadius: '50%'
            })

            expect(screen.getByTestId(/deck-icon/i)).toHaveStyle({
                color: 'rgb(97,219,251)'
            })
        })
    })

    describe('Third deck should render correctly for private decks', () => {
        beforeEach(() => render(<Deck deck={thirdMockDeck} userLocation='privateDecks' />))

        test('Should have a subject, title and author', () => {
            expect(screen.getByText(/third test author/i)).toBeInTheDocument();
            expect(screen.getByText(/javascript/i)).toBeInTheDocument();
            expect(screen.getByText(/third test title/i)).toBeInTheDocument();
        })

        test('Should have uploads and cards but NOT published', () => {
            expect(screen.queryByText(/published/i)).toBeInTheDocument();
            expect(screen.getByText(/uploads/i)).toBeInTheDocument();
            expect(screen.getByText(/cards/i)).toBeInTheDocument();
            expect(screen.getByTestId(/uploads/i)).toHaveTextContent(3);
            expect(screen.getByTestId(/cards/i)).toHaveTextContent(2);
        })

        test('Should have correct icon styling', () => {
            expect(screen.getByTestId(/icon-background/i)).toHaveStyle({
                background: 'var(--black-color)',
                top: '25px',
                left: '25px',
                height: '80px',
                width: '80px',
                borderRadius: '0%'
            })

            expect(screen.getByTestId(/deck-icon/i)).toHaveStyle({
                color: 'rgb(232,212,77)'
            })
        })
    })
})
