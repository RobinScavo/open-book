import Footer from '../Footer';
import { render, screen } from '../../../../tools/test-utils';

describe('Footer component', () => {
    test('renders EditDeck component', () => {
        render(<Footer />)

        expect(screen.getByText(/created by/i)).toBeInTheDocument();
        expect(screen.getByText(/view source code/i)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /robin scavo/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /here/i})).toBeInTheDocument();
    })
})
