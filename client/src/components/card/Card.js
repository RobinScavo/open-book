import  React  from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './card.scss'

const Card = ({ question, answer, handleQuickEdit, index, userLocation }) => {
    const [editQuestionValue, setEditQuestionValue] = useState(question);
    const [editAnswerValue, setEditAnswerValue] = useState(answer);
    const [editMode, setEditMode] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const handleEditMode = () => setEditMode(true);

    // If textarea focus it, otherwise flip card
    const handleClick = (e) => {
        if ((e.target.id) === 'card-edit-textarea' || (e.target.className) === 'edit-button') return;
        setFlipped(!flipped);
    }

    const flippedClass = flipped ? 'flipped' : '';

    return (
        <div
            className={`card ${flippedClass}`}
            onClick={handleClick}
            data-testid='card'
        >

            {/* QUESTION */}
            <div className={`question`}>
                {/* CARD HEADER */}
                <div className="card-header">
                    <button className="flag"></button>
                    <h1 className="card-header-title">Q</h1>
                    {!editMode && userLocation === 'privateDecks' && <button
                        index={index}
                        className="edit-button"
                        onClick={handleEditMode}
                    >Edit</button>}
                </div>

                {/* TEXT AND EDIT BUTTON */}
                {!editMode &&  <h1 data-testid='questionText'>{question}</h1>}

                {/* EDIT INPUTS AND SAVE BUTTON */}
                {editMode && !flipped && <textarea
                    id='card-edit-textarea'
                    className='create-input'
                    defaultValue={question}
                    onChange={(e) => setEditQuestionValue(e.target.value)}
                    data-testid='editQuestionText'
                />}

                <div className="card-edit-buttons">
                    {/* SAVE */}
                    {editMode && <button
                        className="edit-button"
                        onClick={() => {
                            handleQuickEdit ({ editQuestionValue, editAnswerValue, index })
                            setEditMode(false)
                        }}
                    >Save Changes</button>}

                    {/* CANCEL */}
                    {editMode && <button
                        className="edit-button"
                        onClick={() => {
                            setEditMode(false)
                        }}
                    >Cancel</button>}
                </div>
            </div>

            {/* ANSWER */}
            <div className={`answer`}>
                {/* CARD HEADER */}
                <div className="card-header">
                    <button className="flag"></button>
                    <h1 className="card-header-title">A</h1>
                    {!editMode && userLocation === 'privateDecks' && <button
                        index={index}
                        className="edit-button"
                        onClick={handleEditMode}
                        data-testid='editAnswerButton'
                    >Edit</button>}
                </div>

                {/* TEXT AND EDIT BUTTON */}
                {!editMode &&  <h1 data-testid='answerText'>{answer}</h1>}

                {/* EDIT INPUTS AND SAVE BUTTON */}
                {editMode && flipped && <textarea
                    id='card-edit-textarea'
                    className='create-input'
                    defaultValue={answer}
                    onChange={(e) => setEditAnswerValue(e.target.value)}
                    data-testid='editAnswerText'
                />}

                <div className="card-edit-buttons">
                    {/* SAVE */}
                    {editMode && <button
                        className="edit-button"
                        onClick={() => {
                            handleQuickEdit ({ editQuestionValue, editAnswerValue, index })
                            setEditMode(false)
                        }}
                    >Save Changes</button>}

                    {/* CANCEL */}
                    {editMode && <button
                        className="edit-button"
                        onClick={() => {
                            setEditMode(false)
                        }}
                    >Cancel</button>}
                </div>
            </div>

        </div>
     );
}

Card.propTypes = {
    card: PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
    }),
    handleQuickEdit: PropTypes.func,
    index: PropTypes.number,
    userLocation: PropTypes.string
}

export default Card;
