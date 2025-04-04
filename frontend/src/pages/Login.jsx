import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [value, setValue] = useState({
        email: '',
        password: ''
    })

    const [token, setToken] = useState(null)
    const { email, password } = value
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;

        setValue((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', value)

            const storeToken = res.data.token;

            if (storeToken) {
                setToken(storeToken)
                localStorage.setItem("token", storeToken)
            }
            navigate('/chat')

        } catch (error) {
            console.log(error.response.data.message)
        }
        setValue({
            email: '',
            password: ''
        })
    }
    return (<>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

            <input
                type="email"
                name='email'
                value={email}
                placeholder='email'
                onChange={handleChange} />

            <input
                type="password"
                name='password'
                value={password}
                placeholder='password'
                onChange={handleChange} />

            <button type="submit">
                submit
            </button>

        </form>
    </>
    )
}
export default Login