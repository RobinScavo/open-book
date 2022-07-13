import  React, { useEffect }  from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDeck } from '../../redux/decks/decksSlice';
import { toast } from 'react-toastify';

import './createDeck.scss';

const CreateDeck = () => {
    const {user} = useSelector((state) => state.auth);

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('Javascript');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question && answer) {
            handleAddCard(e);
        }
        const deck = {
            user: user._id ,
            author,
            title,
            subject,
            cards,
            'likes': 0,
            'published': false
        }

        dispatch(createDeck(deck));

        navigate('/decks/privateDecks');
    }

    useEffect(() => {
        setAuthor(user.name || '')
    }, [user])

    const handleAddCard = (e) => {
        const questionInput = document.querySelectorAll('.QA');

        e.preventDefault();
        // Remind user to complete the current card first
        if (!answer || !question) {
            toast.error('Please complete the current card first.');
            return;
        }

        const newCard = {'question': question, 'answer': answer};
        const cardsCopy = cards;
        cardsCopy.push(newCard);

        questionInput.forEach(input => {
            input.value = '';
        });

        setCards(cardsCopy);
        setAnswer('');
        setQuestion('');
    }

    return (
        <div className="edit-container">
            <section className='deck-container-heading'>
                <p className='deck-container-title'>Create Deck</p>
            </section>

            <div className="edit-form-container">

                <Link
                    className="btn create-button"
                    to='/decks/privateDecks'
                >Cancel</Link>

                <form className='create-form'>
                    <div className="authTitleContainer">
                        <div className="authTitleDiv">
                            <label className='create-label'>Author</label>
                            <textarea
                                className='create-input'
                                type="text"
                                required
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                data-testid='author-input'
                            />
                        </div>

                        <div className="authTitleDiv">
                            <label className='create-label'>Title</label>
                            <textarea
                                className='create-input'
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                data-testid='title-input'
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            />
                        </div>
                    </div>

                    <label className='create-label'>Subject</label>
                    <select
                        className='create-selector'
                        name="subject"
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        data-testid='subject-input'
                    >
                        <option className='create-option' value="Javascript">Javascript</option>
                        <option className='create-option' value="React">React</option>
                        <option className='create-option' value="CSS">CSS</option>
                        <option className='create-option' value="Web Technologies">Web Technologies</option>
                        <option className='create-option' value="Node.js">Node.js</option>
                        <option className='create-option' value="Drupal">Drupal</option>
                        <option className='create-option' value="HTML5">HTML5</option>
                        <option className='create-option' value="SASS">SASS</option>
                        <option className='create-option' value="NPM">NPM</option>
                        <option className='create-option' value="Wordpress">Wordpress</option>
                        <option className='create-option' value="Mongo">Mongo</option>
                    </select>

                    <label className='create-label'>Question</label>
                    <textarea
                        className='create-input QA'
                        type="text"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        data-testid='question-input'
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    />

                    <label className='create-label'>Answer</label>
                    <textarea
                        className='create-input QA'
                        type="text"
                        required
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        data-testid='answer-input'
                    />

                    <button
                        className="btn create-button"
                        onClick={handleAddCard}
                        data-testid='add-card-button'
                    >Add Card</button>

                    <button
                        type='submit'
                        className="btn create-button"
                        onClick={handleSubmit}
                    >Submit Deck</button>

                </form>
            </div>
        </div>
     );
}

export default CreateDeck;
