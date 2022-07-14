import  React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    getPublicDeck,
    getPrivateDeck,
    editDeck,
    reset
} from '../../redux/decks/decksSlice';

import Card from '../../components/card/Card';
import Spinner from '../../components/spinner/Spinner';

import './cardContainer.scss';

const CardContainer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const deckID = useParams().id;

    const {user} = useSelector((state) => state.auth);
    const userLocation = location.pathname.split('/')[2];

    const {decks, isLoading, isError, message} = useSelector((state) => state.decks);

    useEffect(() => {
        if (isError) {
            toast.error(`Deck retrieval failed: ${message}`);
        }

        if (userLocation !== 'privateDecks') {
          dispatch(getPublicDeck(deckID));
        } else if (userLocation === 'privateDecks') {
          dispatch(getPrivateDeck(deckID));
        }

        return () => {
            dispatch(reset());
        }
    }, [user, navigate, isError, message, dispatch, userLocation, deckID]);

    const handleQuickEdit = ({ editQuestionValue, editAnswerValue, index }) => {
        const newCard = {'question': editQuestionValue, 'answer': editAnswerValue};
        const newCards = [...decks.cards];
        newCards.splice(index, 1, newCard);
        const pojo = {id: deckID, data: {cards: newCards}};

        dispatch(editDeck(pojo));
        dispatch(reset());

        toast.success('Deck has been updated.');
        navigate(`/decks/privateDecks/`)
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="card-container" data-testid='card-container'>
            <section className='deck-container-heading'>
                {user && <p className='deck-container-title'
                    >Private Library</p>
                }

                {!user && <p className='deck-container-title'
                    >Public Library</p>
                }
            </section>

            {decks.cards && decks.cards.map((card, index) => (

                <Card
                    index={index}
                    key={`${decks._id}question${index}`}
                    question={card.question}
                    answer={card.answer}
                    userLocation={userLocation}
                    handleQuickEdit={handleQuickEdit}
                />
            ))}

        </div>
     );
}

export default CardContainer;
