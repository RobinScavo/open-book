import { render, screen } from '@testing-library/react';
import  userEvent from  "@testing-library/user-event"
import CardContainer from '../CardContainer';

import { checkProps } from "../../../../tools/utils";

describe('CardContainer page', () => {
    const card = { question: 'test question', answer: 'test answer'}


    test('renders Card component', () => {
        render(<CardContainer />)

        expect(screen.getByTestId('card-container')).toBeInTheDocument();
    })

    test('card can be edited', async () => {
        const user = userEvent.setup()

        render(<Card card={card} userLocation='privateDecks'/>)

        const editButton = screen.getByRole('button', {name: /edit card/i});
        await user.click(editButton)

        const  questionInput = screen.getByDisplayValue(/test question/i)
        const  answerInput = screen.getByDisplayValue(/test answer/i)

        expect(questionInput).toBeInTheDocument();
        expect(answerInput).toBeInTheDocument();

        await user.type(questionInput, 'edit test question');
        await user.type(answerInput, 'edit test answer');

        const  editedQuestionInput = screen.getByDisplayValue(/edit test question/i)
        const  editedAnswerInput = screen.getByDisplayValue(/edit test answer/i)

        expect(editedQuestionInput).toBeInTheDocument();
        expect(editedAnswerInput).toBeInTheDocument();
    })

})
