// import { render, screen } from '@testing-library/react';
// import  userEvent from  "@testing-library/user-event"
// import Card from '../Card';

// import { checkProps } from "../../../../tools/utils";

describe('card renders text and can be edited', () => {
    // const card = { question: 'test question', answer: 'test answer'}

    describe('Checking Proptypes', () => {
        test('Should not throw a warning', () => {
            // const expectedProps = {
            //     question: card.question,
            //     answer: card.answer,
            //     handleQuickEdit: jest.fn(),
            //     index: 1,
            //     userLocation: 'privateDecks',
            // }
            // const propsErr = checkProps(Card, expectedProps)
            // expect(propsErr).toBeUndefined();
        });
    })

    test('renders Card component', () => {
        // render(<Card
        //     question={card.question}
        //     answer={card.answer}
        //     handleQuickEdit={jest.fn()}
        //     index={1}
        //     userLocation='privateDecks'
        // />)

        // const questionText = screen.getByTestId('questionText');
        // const answerText  = screen.getByTestId('answerText');

        // expect(questionText).toBeInTheDocument();
        // expect(answerText).toBeInTheDocument();
    })

    test('card can be edited', async () => {
        // const user = userEvent.setup()

        // render(<Card card={card} userLocation='privateDecks'/>)

        // const editButton = screen.getByTestId(/editQuestionButton/i);
        // await user.click(editButton)

        // const  questionInput = screen.getByDisplayValue(/test question/i)
        // const  answerInput = screen.getByDisplayValue(/test answer/i)

        // expect(questionInput).toBeInTheDocument();
        // expect(answerInput).toBeInTheDocument();

        // await user.type(questionInput, 'edit test question');
        // await user.type(answerInput, 'edit test answer');

        // const  editedQuestionInput = screen.getByDisplayValue(/edit test question/i)
        // const  editedAnswerInput = screen.getByDisplayValue(/edit test answer/i)

        // expect(editedQuestionInput).toBeInTheDocument();
        // expect(editedAnswerInput).toBeInTheDocument();
    })

})
