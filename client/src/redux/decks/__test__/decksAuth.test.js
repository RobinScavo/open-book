import reducer, { getPublicDecks } from '../decksSlice';
import { mockDeck, secondMockDeck, thirdMockDeck } from '../../../../tools/utils';

describe('decks slice', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            decks: [],
            isError: false,
            isSuccess: false,
            isLoading: false,
            message: ''
        })
    });

    test('should get all decks', () => {
        const previousState = [
            mockDeck,
            secondMockDeck,
            thirdMockDeck
        ]
        expect(reducer(previousState, getPublicDecks())).toEqual([
            mockDeck,
            secondMockDeck,
            thirdMockDeck,
        ])
    });

    test('should get specific deck', () => {
        const previousState = mockDeck

        expect(reducer(previousState, getPublicDecks())).toEqual(mockDeck)
    });

})
