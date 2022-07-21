import { render, screen } from '@testing-library/react';

import Logo from '../Logo';


describe('Logo Component', () => {
    render(<Logo />)

    test('renders Logo and text without errors', () => {
        expect(screen.getByText("O")).toBeInTheDocument();
        expect(screen.getByText(/openbook/i)).toBeInTheDocument();
    })
})
