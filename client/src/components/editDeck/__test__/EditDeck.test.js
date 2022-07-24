import { render, screen } from '../../../../tools/test-utils';
import  userEvent from  "@testing-library/user-event";
import { BrowserRouter as Router } from 'react-router-dom';

import EditDeck from '../EditDeck';
import { mockDeck, checkProps } from '../../../../tools/utils';


describe('EditDeck component', () => {
    describe('Checking Proptypes', () => {
        test('Should not throw a warning', () => {
            const expectedProps = {
                deck: mockDeck,
                handleToggleEditDeck: jest.fn(),
            }
            const propsErr = checkProps(EditDeck, expectedProps)
            expect(propsErr).toBeUndefined();
        });
    })
})
