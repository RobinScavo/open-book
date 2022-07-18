import React from 'react';
import PropTypes from 'prop-types';

import {
    DiReact,
    DiDrupal,
    DiGithubBadge,
    DiHtml5,
    DiJsBadge,
    DiNodejs,
    DiNpm,
    DiSass,
    DiWordpress,
    DiAtom,
    DiCssTricks,
    DiDatabase
} from 'react-icons/di'

import './deck.scss';

const Deck = ({ deck, userLocation }) => {
    const { subject, title, author, likes, published, cards } = deck
    const publicDeck = published ? 'Published' : 'Private';

    const iconColors = {
        React: {
            color: 'rgb(97,219,251)',
            backgroundColor: 'var(--black-color)',
            top: '7px',
            left: '8px',
            height: '100px',
            width: '100px',
            borderRadius: '50%'
        },
        Javascript: {
            color: 'rgb(232,212,77)',
            backgroundColor: 'var(--black-color)',
            top: '25px',
            left: '25px',
            height: '80px',
            width: '80px',
            borderRadius: '0%'
        },
        Drupal: {
            color: 'rgb(25,138,200)',
            backgroundColor: '',
            top: '0',
            left: '0',
            height: '0px',
            width: '0px',
            borderRadius: '0%'
        },
        HTML5: {
            color: 'rgb(221,75,37)',
            backgroundColor: 'var(--black-color)',
            top: '25px',
            left: '35px',
            height: '65px',
            width: '50px',
            borderRadius: '0%'
        },
        SASS: {
            color: 'rgb(201,97,149)',
            backgroundColor: '',
            top: '0',
            left: '0',
            height: '0px',
            width: '0px',
            borderRadius: '0%'
        },
        NPM: {
            color: 'rgb(220,45,53)',
            backgroundColor: '',
            top: '0',
            left: '0',
            height: '0px',
            width: '0px',
            borderRadius: '0%'
        },
        'Node.js': {
            color: 'var(--black-color)',
            backgroundColor: 'rgb(84,161,67)',
            top: '35px',
            left: '0px',
            height: '50px',
            width: '117px',
            borderRadius: '10%'
        },
        Wordpress: {
            color: 'rgb(32,113,149)',
            backgroundColor: '',
            top: '0',
            left: '0',
            height: '0px',
            width: '0px',
            borderRadius: '0%'
        },
        'Web Technologies': {
            color: 'var(--black-color)',
            backgroundColor: '',
            top: '0',
            left: '0',
            height: '0px',
            width: '0px',
            borderRadius: '0%'
        },
        CSS: {
            color: 'var(--light-color)',
            backgroundColor: 'linear-gradient(to top, rgb(241,133,9) 0%, rgb(210,24,93) 100%)',
            top: '8px',
            left: '8px',
            height: '100px',
            width: '100px',
            borderRadius: '50%'
        },
        Mongo: {
            color: 'rgb(65,230,97)',
            backgroundColor: 'var(--black-color)',
            top: '27px',
            left: '28px',
            height: '60px',
            width: '60px',
            borderRadius: '10%'
        },
    }

    return (
        <div className="deck" data-testid='deck'>
            <div className="upper-deck">

                <div className="deck-icon-container">
                    <div
                        className="icon-background"
                        data-testid="icon-background"
                        style={{
                            background: iconColors[subject].backgroundColor,
                            top: iconColors[subject].top,
                            left: iconColors[subject].left,
                            height: iconColors[subject].height,
                            width: iconColors[subject].width,
                            borderRadius: iconColors[subject].borderRadius,
                        }}
                    ></div>

                    <div className="deck-icon"
                        style={{color: iconColors[subject].color}}
                        data-testid="deck-icon"
                    >
                            {subject === 'React' && <DiReact />}
                            {subject === 'Javascript' && <DiJsBadge />}
                            {subject === 'Drupal' && <DiDrupal />}
                            {subject === 'Github' && <DiGithubBadge />}
                            {subject === 'HTML5' && <DiHtml5 />}
                            {subject === 'SASS' && <DiSass />}
                            {subject === 'NPM' && <DiNpm />}
                            {subject === 'Node.js' && <DiNodejs />}
                            {subject === 'Wordpress' && <DiWordpress />}
                            {subject === 'Web Technologies' && <DiAtom />}
                            {subject === 'CSS' && <DiCssTricks />}
                            {subject === 'Mongo' && <DiDatabase />}
                    </div>
                </div>

                <div className="deck-info">
                    <h1 className='deck-subject'>{subject}</h1>
                    <h2 className='deck-title'>{title}</h2>
                    <p className='deck-author'>{author}</p>
                </div>
            </div>

            <div className="deck-footer">
                {userLocation === 'privateDecks' &&
                    <p className='deck-uploads'>{publicDeck}</p>
                }
                <p className='deck-uploads'>Uploads <span className='deck-number' data-testid='uploads'>{likes}</span></p>
                <p className="deck-uploads">Cards <span className='deck-number' data-testid='cards'>{cards.length}</span></p>
            </div>
        </div>
     );
}

Deck.propTypes = {
    deck: PropTypes.shape({
        subject: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        likes: PropTypes.number,
        cards: PropTypes.array,
    }),
    userLocation: PropTypes.string
}

export default Deck;
