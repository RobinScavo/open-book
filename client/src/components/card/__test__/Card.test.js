import { render, screen } from '@testing-library/react';
import  userEvent from  "@testing-library/user-event"
import Card from '../Card';

import { checkProps } from "../../../../tools/utils";

describe('card renders text and can be edited', () => {
    const card = { question: 'test question', answer: 'test answer'}

    describe('Checking Proptypes', () => {
        test('Should not throw a warning', () => {
            const expectedProps = {
                question: card.question,
                answer: card.answer,
                handleQuickEdit: jest.fn(),
                index: 1,
                userLocation: 'privateDecks',
            }
            const propsErr = checkProps(Card, expectedProps)
            expect(propsErr).toBeUndefined();
        });
    })

    test('renders Card component', () => {
        render(<Card
            question={card.question}
            answer={card.answer}
            handleQuickEdit={jest.fn()}
            index={1}
            userLocation='privateDecks'
        />)

        expect(screen.getByText(/test question/i)).toBeInTheDocument();
        expect(screen.getByText(/test answer/i)).toBeInTheDocument();
        expect(screen.getByText("Q")).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument();
    })

    test('card is "flipped" when clicked', async () => {
        const user = userEvent.setup()

        render(<Card card={card} userLocation='privateDecks'/>)

        const cardDiv = screen.getByTestId(/card/i);
        await user.click(cardDiv);
        expect(cardDiv).toHaveClass('flipped');
    })

})
