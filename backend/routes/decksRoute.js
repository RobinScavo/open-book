const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const {
    getPublicDecks,
    getPublicDeck,
    getPrivateDecks,
    getPrivateDeck,
    createDeck,
    updateDeck,
    deleteDeck,
} = require('../controllers/deckControllers');

// Protected
router.route('/privateDecks').get(protect, getPrivateDecks).post(protect, createDeck)
router.route('/privateDecks/:id').get(protect, getPrivateDeck).patch(protect, updateDeck).delete(protect, deleteDeck)

// Unprotected
router.route('/').get(getPublicDecks)
router.route('/:id').get(getPublicDeck)

module.exports = router;
