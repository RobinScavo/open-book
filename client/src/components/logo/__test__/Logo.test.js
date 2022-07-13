import { shallow } from 'enzyme'

import Logo from '../Logo';

const setUp = () => {
    const component = shallow(<Logo />);
    return component;
}

describe('Logo Component', () => {
    let component;

    beforeEach(() => {
        component = setUp()
    })

    test('renders Logo without errors', () => {
        const wrapper = component.find('.logo-image');
        expect(wrapper.length).toBe(1)
    })

    test('renders text without errors', () => {
        const wrapper = component.find('.logo-title');
        expect(wrapper.length).toBe(1)
    })

})
