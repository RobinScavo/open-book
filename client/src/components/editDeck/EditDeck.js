import  React, { useEffect }  from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
    getPrivateDeck,
    editDeck,
    reset
} from '../../redux/decks/decksSlice';

import Spinner from '../spinner/Spinner';

import './editDeck.scss';

const EditDeck = () => {
    const {decks, isLoading, isError, message} = useSelector((state) => state.decks);

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [cards, setCards] = useState('');
    const [cardIndex, setCardIndex ] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [cardWasEdited, setCardWasEdited] = useState(false);
    const [addingNewCard, setAddingNewCard] = useState(false);

    const deckID = useParams().id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(`Deck retrieval failed: ${message}`);
        }

        dispatch(getPrivateDeck(deckID))

        return () => {
            dispatch(reset());
        }
    }, [isError, deckID, dispatch, message]);

    useEffect(() => {
        setAuthor(decks.author || '')
        setTitle(decks.title || '')
        setSubject(decks.subject || '')
        setCards(decks.cards || '')
    }, [decks])

    useEffect(() => {
        if (cards[cardIndex]) {
            setCurrentQuestion(cards[cardIndex].question)
            setCurrentAnswer(cards[cardIndex].answer)
        }
    }, [cards, cardIndex])

    const handleSubmit = (e) => {
        e.preventDefault();

        let newCards = [...cards];

        // If the user edited the current card, push it first
        if (cardWasEdited) {
            newCards.splice(cardIndex, 1, {'question': currentQuestion, 'answer': currentAnswer})
        }

        // If the user was adding a card and completed it, push it first
        if (addingNewCard && currentQuestion && currentAnswer) {
            let newCard = {question: currentQuestion, answer: currentAnswer}
            newCards.push(newCard)
        }


        // Create a new deck with the original deck ID and user ID
        const newDeck = {
            id: decks._id,
            data: {
                _id: decks._id,
                user: decks.user,
                author,
                title,
                subject,
                cards: newCards
            }
        };

        try {
            dispatch(editDeck(newDeck));;
            dispatch(reset());

            toast.success('Deck has been updated.');
            navigate(`/decks/privateDecks`);
        } catch {
            toast.error('Something went wrong.');
        }
    }

    const handleAddCard = () => {

        // Remind user to complete the current card first
        if (!currentAnswer || !currentQuestion) {
            toast.error('Please complete the current card first.');
            return;
        }

        let newCards = [...cards];

        // If the user is adding multiple cards, push the current one first
        if (addingNewCard) {
            let newCard = {question: currentQuestion, answer: currentAnswer}
            newCards.push(newCard);

            setCards(newCards);
            setAddingNewCard(false);
            setCardIndex(newCards.length)
        }

        // Clear the textareas and create a new card at the end of the deck
        setCurrentQuestion('');
        setCurrentAnswer('');
        setCardIndex(newCards.length);
        setAddingNewCard(true)
    }

    const handleDeleteCard = () => {
        if (cards && !cards.length) return;

        let newCards = [...cards];

        // If the user was adding a card simply go to the previous
        if (addingNewCard) {
            setCardIndex(cardIndex -2)
            return;
        }

        // Remove the card and display the previous card if one exists,
        // otherwise display the next card.
        if (cardIndex > 0) {
            newCards.splice(cardIndex, 1);
            setCardIndex(cardIndex -1);
            setCards(newCards);
            setCurrentQuestion(cards[cardIndex -1].question);
            setCurrentAnswer(cards[cardIndex -1].answer);
        } else if (cardIndex === 0) {
            newCards.splice(cardIndex, 1);
            setCards(newCards);
            setCurrentQuestion(cards[cardIndex +1].question);
            setCurrentAnswer(cards[cardIndex +1].answer);
        } else if (cards.length <= 1) {
            toast.error('Cannot remove last card in deck.')
        }
    }

    const handleCardWasEdited = () => {
        if (!cardWasEdited) return;

        let newCards = [...cards];
        newCards.splice(cardIndex, 1, {'question': currentQuestion, 'answer': currentAnswer})

        setCards(newCards);
        setCardWasEdited(false);
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="edit-container">
            <section className='deck-container-heading'>
                <p className='deck-container-title'>Edit Deck</p>
            </section>

            <div className="edit-form-container">
                <Link
                    className="btn"
                    to='/decks/privateDecks'
                >Cancel</Link>

                <form className='create-form'>
                    <div className="authTitleContainer">
                        <div className="authTitleDiv">
                            <label className='create-label' htmlFor='author'>Author</label>
                            <textarea
                                className='create-input'
                                type="text"
                                required
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                id='author'
                                data-testid='edit-author'
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
                                data-testid='edit-title'
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
                        data-testid='edit-subject'
                    >
                        <option className='create-option' value="Javascript">Javascript</option>
                        <option className='create-option' value="React">React</option>
                        <option className='create-option' value="CSS">CSS</option>
                        <option className='create-option' value="Web Technologies">Web Technologies</option>
                        <option className='create-option' value="Node.js">Node.js</option>
                    </select>

                    <div className="card-toggle-div">
                        {cardIndex > 0 && <button
                            className='btn card-toggle-button'
                            onClick = {(e) => {
                                e.preventDefault()
                                setCardIndex(cardIndex -1)
                                setCurrentQuestion(cards[cardIndex -1].question)
                                setCurrentAnswer(cards[cardIndex -1].answer)
                                setAddingNewCard(false)
                                handleCardWasEdited()
                            }}
                        >Previous</button>}

                        {cards && cardIndex < cards.length-1 && <button
                            className='btn card-toggle-button'
                            onClick = {(e) => {
                                e.preventDefault()
                                setCardIndex(cardIndex +1)
                                setCurrentQuestion(cards[cardIndex +1].question)
                                setCurrentAnswer(cards[cardIndex +1].answer)
                                setAddingNewCard(false)
                                handleCardWasEdited()
                            }}
                        >Next</button>}
                    </div>

                    <h2 className='card-index-text'>Card #{cardIndex +1}</h2>

                    <label className='create-label'>Question</label>
                    <textarea
                        className='create-input QA'
                        type="text"
                        required
                        value={currentQuestion}
                        onChange={(e) => {
                            setCurrentQuestion(e.target.value)
                            setCardWasEdited(true)
                        }}
                        data-testid='edit-question'
                    />

                    <label className='create-label'>Answer</label>
                    <textarea
                        className='create-input QA'
                        type="text"
                        required
                        value={currentAnswer}
                        onChange={(e) => {
                            setCurrentAnswer(e.target.value)
                            setCardWasEdited(true)
                        }}
                        data-testid='edit-answer'
                    />

                    <button
                        className="btn create-button"
                        onClick={(e) => {
                            e.preventDefault()
                            handleAddCard()
                        }}
                    >Add Card</button>

                    {cards.length > 1 && <button
                        className="btn create-button"
                        onClick={(e) => {
                            e.preventDefault()
                            handleDeleteCard()
                        }}
                    >Remove Card</button>}

                    <button
                        className="btn create-button"
                        onClick={handleSubmit}
                    >Save Changes</button>

                </form>
            </div>
        </div>
        );
}

EditDeck.propTypes = {
    deck: PropTypes.shape({
        author: PropTypes.string,
        title: PropTypes.string,
        subject: PropTypes.string,
        question: PropTypes.string,
        answer: PropTypes.string,
    }),
    toggleEditDeck: PropTypes.func,
}


export default EditDeck;
