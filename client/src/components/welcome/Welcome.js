import { Link } from 'react-router-dom';

import './welcome.scss'

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-div">
                <div className="welcome-header-container">
                    <h1 className="welcome">Welc<span className='welcome-flair'>O</span>me</h1>
                    <h2 className="welcome-title">to OpenBook!</h2>
                </div>
                <p className='welcome-text'>Feel free to browse the public decks as a guest. When you're ready to build your own, create an account and begin.</p>
                <p className='welcome-text'>If you wish to make changes to a public deck, use the 'upload' option to create a copy in your private library. Enjoy!</p>
                <Link to='/decks' className="btn">Let's go!</Link>
            </div>
        </div>
     );
}

export default Welcome;
