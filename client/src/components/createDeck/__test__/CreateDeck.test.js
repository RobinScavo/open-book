import { render, screen } from '../../../../tools/test-utils';
import  userEvent from  "@testing-library/user-event";
import { BrowserRouter as Router } from 'react-router-dom'
import CreateDeck from '../CreateDeck';


describe('create deck page', () => {

    test('renders CreateDeck component', () => {
        render(<Router><CreateDeck/></Router>)

        expect(screen.getByTestId('author-input')).toBeInTheDocument();
        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('subject-input')).toBeInTheDocument();
        expect(screen.getByTestId('question-input')).toBeInTheDocument();
        expect(screen.getByTestId('answer-input')).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /cancel/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /add card/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /submit deck/i})).toBeInTheDocument();
    })

    test('createDeck can be edited', async () => {
        const user = userEvent.setup()

        render(<Router><CreateDeck/></Router>)

        const  authorInput = screen.getByTestId('author-input')
        const  titleInput = screen.getByTestId('title-input')
        const  subjectInput = screen.getByTestId('subject-input')
        const  questionInput = screen.getByTestId('question-input')
        const  answerInput = screen.getByTestId('answer-input')

        await user.type(authorInput, 'created test author');
        await user.type(titleInput, 'created test title');
        await user.selectOptions(subjectInput, 'CSS');
        await user.type(questionInput, 'created test question');
        await user.type(answerInput, 'created test answer');

        const  creatededAuthorInput = screen.getByDisplayValue(/created test Author/i)
        const  creatededTitleInput = screen.getByDisplayValue(/created test Title/i)
        const  creatededSubjectInput = screen.getByDisplayValue(/css/i)
        const  creatededQuestionInput = screen.getByDisplayValue(/created test question/i)
        const  creatededAnswerInput = screen.getByDisplayValue(/created test answer/i)

        expect(creatededAuthorInput).toBeInTheDocument();
        expect(creatededTitleInput).toBeInTheDocument();
        expect(creatededSubjectInput).toBeInTheDocument();
        expect(creatededQuestionInput).toBeInTheDocument();
        expect(creatededAnswerInput).toBeInTheDocument();
    })

    test('add card button should clear question and answer inputs', async () => {
        const user = userEvent.setup()

        render(<Router><CreateDeck/></Router>)

        const  questionInput = screen.getByTestId('question-input')
        const  answerInput = screen.getByTestId('answer-input')

        await user.type(questionInput, 'created test question');
        await user.type(answerInput, 'created test answer');

        user.click(screen.getByTestId('add-card-button'));

        expect(questionInput).toHaveTextContent('');
        expect(answerInput).toHaveTextContent('');
    })

})
