import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    editDeck,
    createDeck,
    deleteDeck,
    reset
} from '../../redux/decks/decksSlice';

import './controlPanel.scss';

const ControlPanel = ({
    showHomeButton,
    showCreateButton,
    showEditButton,
    showUploadButton,
    showYourDecksButton,
    showDeleteButton,
    showPublishButton,
    controlPanelDisplay
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deckID = useParams().id;

    const {user} = useSelector((state) => state.auth);

    const { decks } = useSelector((state) => state.decks);

    const visible = controlPanelDisplay ? 'open' : 'closed';

    const handleDelete = () => {
        dispatch(deleteDeck(deckID));
        navigate('/decks/privateDecks')
      }

      const handleUpload = () => {
        const uploadsPojo = {id: deckID, data: {likes: decks.likes + 1}};

        const myCopy = {...decks};
        delete myCopy._id;
        myCopy.likes = 0;
        myCopy.published = false;
        myCopy.user = user;

        navigate('/decks');
        try {
            dispatch(editDeck(uploadsPojo));
            dispatch(reset());

            dispatch(createDeck(myCopy));
            dispatch(reset());

            toast.success('This deck now exists in your library!');
        } catch {
            toast.error('Upload failed.');
        }
      }

      const handlePublish = () => {
        const pojo = { id: decks._id, data: {published: true}}

        try {
            navigate('/decks/privateDecks')
            dispatch(editDeck(pojo))
            dispatch(reset())
            toast.success('This deck has been published!')
        } catch {
            toast.error('Publishing failed.')
        }
      }

    return (
        <div className={`control-panel ${visible}`} data-test='control-panel'>
            {/* HOME */}
            {showHomeButton  &&
                <Link
                    className='btn control-button'
                    to='/decks'
                    data-test='home-button'
                >Home</Link>
            }

            {/* CREATE DECK */}
            {showCreateButton && user &&
                <Link
                    className='btn control-button'
                    to='/createDeck'
                    data-test='create-button'
                >Create Deck</Link>
            }

            {/* CREATE DECK NO USER */}
            {showCreateButton && !user &&
                <Link
                    className='btn control-button'
                    to='/login'
                    data-test='create-button'
                >Create Deck</Link>
            }

            {/* DELETE DECK */}
            {showDeleteButton &&
                <button
                    className='btn control-button'
                    onClick={handleDelete}
                    data-test='delete-button'
                >Delete Deck</button>
            }

            {/* EDIT DECK */}
            {showEditButton  &&
                <Link
                    className="btn control-button"
                    to={`/editDeck/${deckID}`}
                    data-test='edit-button'
                >Edit Deck</Link>
            }

            {/* PRIVATE DECKS */}
            {user && showYourDecksButton &&
                <Link
                    className='btn control-button'
                    to='/decks/privateDecks'
                    data-test='your-decks-button'
                >Your Decks</Link>
            }

            {/* PUBLISH */}
            {decks && !decks.published && showPublishButton &&
                <button
                    className="btn control-button"
                    onClick={handlePublish}
                    data-test='publish-button'
                >Publish</button>
            }

            {/* UPLOAD DECK */}
            {showUploadButton &&
                <button
                    className="btn control-button"
                    onClick={handleUpload}
                    data-test='upload-button'
                >Upload</button>
            }

        </div>
     );
}

ControlPanel.propTypes = {
    showHomeButton: PropTypes.bool,
    showCreateButton: PropTypes.bool,
    showEditButton: PropTypes.bool,
    showUploadButton: PropTypes.bool,
    showYourDecksButton: PropTypes.bool,
    showDeleteButton: PropTypes.bool,
    showPublishButton: PropTypes.bool,
    controlPanelDisplay: PropTypes.bool
}

export default ControlPanel;
