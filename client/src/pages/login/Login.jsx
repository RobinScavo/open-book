import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../redux/auth/authSlice';

import  Spinner from '../../components/spinner/Spinner';

import './login.scss'


function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    const { name, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if(isSuccess || user) {
            navigate('/decks/privateDecks');
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]);;

    const handleInput = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            password
        }

        dispatch(login(userData));
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <section className="login-container" data-testid='login-page'>
            <div className="form-container">
                <div className="toggle-login-div">
                    <button id='logIn-button' className="toggle-button">Log In</button>
                    <Link to='/signup' id='signup-button' className="toggle-button">Sign Up</Link>
                </div>

                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="login-input-div">
                            <input
                                type="text"
                                className='login-input'
                                id='name'
                                name='name'
                                value={name}
                                placeholder='Enter your name'
                                onChange={handleInput}
                                data-testid='login-name-input'
                            />
                        </div>
                        <div className="login-input-div">
                            <input
                                type="password"
                                className='login-input'
                                id='password'
                                name='password'
                                value={password}
                                placeholder='Enter a password'
                                onChange={handleInput}
                                data-testid='login-password-input'
                            />
                        </div>
                        <div className="login-input-div">
                            <button
                                type='submit'
                                id='submit-button'
                                className="btn"
                                name='login-button'
                            > Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;
