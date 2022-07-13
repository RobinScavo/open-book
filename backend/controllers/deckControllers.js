const asyncHandler = require('express-async-handler')

const Deck = require('../models/deckModel');

// @desc Get public Decks
// @route GET /decks
// @access Public
const getPublicDecks = asyncHandler(async (req, res) => {
    const decks = await Deck.find();
    // decks.sort( {likes: 1} )

    res.status(200).json(decks)
})

// @desc Get public Deck
// @route GET /decks/:id
// @access Public
const getPublicDeck = asyncHandler(async (req, res) => {
    const deck = await Deck.findById(req.params.id);

    res.status(200).json(deck)
})

// @desc Get private Decks
// @route GET /privateDecks
// @access private
const getPrivateDecks = asyncHandler(async (req, res) => {
    const decks = await Deck.find({ user: req.user.id });

    res.status(200).json(decks)
})

// @desc Get private Deck
// @route GET /privateDecks/:id
// @access Private
const getPrivateDeck = asyncHandler(async (req, res) => {
    const deck = await Deck.findById(req.params.id);

    res.status(200).json(deck)
})

// @desc Set private deck
// @route POST /privateDecks
// @access private
const createDeck = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const deck = await Deck.create(req.body)

    res.status(200).json(deck)
})

// @desc Update deck
// @route PUT /privateDecks/:id
// @access private
const updateDeck = asyncHandler(async (req, res) => {
    const deck = await Deck.findById(req.params.id);

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(!deck) {
        res.status(400)
        throw new Error('Deck not found')
    }

    await Deck.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
    })
    const newDeck = await Deck.findById(req.params.id);

    res.status(200).json({id: req.params.id, updatedDeck: newDeck})
})

// @desc Delete deck
// @route DELETE /privateDecks/:id
// @access private
const deleteDeck = asyncHandler(async (req, res) => {
    const deck = await Deck.findById(req.params.id);

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found.')
    }

    // Make sure logged in user matches the deck user
    if (deck.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }

    if(!deck) {
        res.status(400)
        throw new Error('Deck not found')
    }

    await deck.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPublicDecks,
    getPublicDeck,
    getPrivateDecks,
    getPrivateDeck,
    createDeck,
    updateDeck,
    deleteDeck,
    // incrementUpload
}
