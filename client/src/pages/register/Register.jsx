import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { register, reset } from '../../redux/auth/authSlice';

import Spinner from '../../components/spinner/Spinner';

import '../login/login.scss';
import './register.scss';


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: ''
    })

    const { name, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/decks/privateDecks')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleInput = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords must match.')
        } else  {
            const userData = { name, password }
            dispatch(register(userData))
        }

    }

    if (isLoading) {
        return <Spinner />
    }


    return (
        <section className='login-container'>
            <div className="form-container">
                <div className="toggle-login-div">
                    <Link to='/login' id='login-button' className="toggle-button">Log In</Link>
                    <button id='signUp-button' className="toggle-button">Sign Up</button>
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
                            />
                        </div>
                        <div className="login-input-div">
                            <input
                                type="password"
                                className='login-input'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={confirmPassword}
                                placeholder='Confirm password'
                                onChange={handleInput}
                            />
                        </div>
                        <div className="login-input-div">
                            <button
                                type='submit'
                                id='submit-button'
                                className="btn"
                            > Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
)
}

export default Register
