import configureStore from 'redux-mock-store';

import { initialState } from '../../auth/authSlice';

const userData = {
    name: 'first',
    password: 'first'
}

describe('auth slice', () => {
    test('should initially set state to null user, false actions and empty string', () => {
        const mockStore = configureStore([]);
        const store = mockStore(initialState);
        const state = store.getState();


        expect(state.user).toEqual(null);
        expect(state.isError).toEqual(false);
        expect(state.isSuccess).toEqual(false);
        expect(state.isLoading).toEqual(false);
        expect(state.message).toEqual('');
    });
})
