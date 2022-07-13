import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    getPublicDecks,
    getPrivateDecks,
    reset
  } from '../../redux/decks/decksSlice';
import Deck from '../../components/deck/Deck';
import Spinner from '../../components/spinner/Spinner';

import './deckContainer.scss';

const DeckContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const {user} = useSelector((state) => state.auth);
    const {decks, isLoading, isError, message} = useSelector((state) => state.decks);

    const userLocation = location.pathname.split('/')[2];
    const route = userLocation ? 'privateDecks/' : '';

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (userLocation !== 'privateDecks') {
          dispatch(getPublicDecks());
        } else if (userLocation === 'privateDecks') {
          dispatch(getPrivateDecks());
        }

        return () => {
            dispatch(reset());
        }
    }, [user, navigate, isError, message, dispatch, userLocation]);

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="deck-container">
            <section className='deck-container-heading'>
                {user && <p className='deck-container-title'
                    >Private Library</p>
                }

                {!user && <p className='deck-container-title'
                    >Public Library</p>
                }
            </section>

            {decks && decks.length > 0 && decks.map((deck) => (
                <Link
                    to={`/decks/${route}${deck._id}`}
                    key={deck._id}
                >
                    <Deck
                        key={deck._id}
                        deck={deck}
                        userLocation={userLocation}
                    />
                </Link>
            ))}
        </div>
     );
}

export default DeckContainer;
