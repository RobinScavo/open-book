import axios from 'axios';

const PRIVATE_URL = 'http://localhost:8080/decks/privateDecks/';
const PUBLIC_URL = 'http://localhost:8080/decks/';

const getPublicDecks = async () => {
    const response = await axios.get(PUBLIC_URL);

    return response.data;
}

const getPublicDeck = async (ID) => {
    const response = await axios.get(PUBLIC_URL + ID);

    return response.data;
}

const getPrivateDecks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(PRIVATE_URL, config);

    return response.data;
}

const getPrivateDeck = async (ID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(PRIVATE_URL + ID, config);

    return response.data;
}

const createDeck = async (deckData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(PRIVATE_URL, deckData, config);

    return response.data;
}

const deleteDeck = async (deckId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(PRIVATE_URL + deckId, config);

    return response.data;
}

const editDeck = async (pojo, token) => {
    const { id, data } = pojo;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(PRIVATE_URL + id, data, config);

    return response.data;
}

const decksService = {
    getPublicDecks,
    getPublicDeck,
    getPrivateDecks,
    getPrivateDeck,
    createDeck,
    deleteDeck,
    editDeck,
}

export default decksService
