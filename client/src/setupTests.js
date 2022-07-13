import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server.js';

// Enable API mocking before tests
beforeAll(() => server.listen({
    onUnhandledRequest: 'error'
}))

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done
afterAll(() => server.close())


// ENZYME
import Enzyme from 'enzyme';
import EnzymeAdapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
})
