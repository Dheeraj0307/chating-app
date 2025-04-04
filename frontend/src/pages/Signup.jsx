import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [value, setValue] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const { fullName, email, password } = value
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValue((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('http://localhost:3000/api/auth/signup', value)
            navigate('/login')
            console.log(res, 'res')

        } catch (error) {
            console.log(error.response.data.message)
        }
        setValue({
            fullName: '',
            email: '',
            password: ''
        })
    }
    return (<>
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name='fullName'
                value={fullName}
                placeholder='name'
                onChange={handleChange} />

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

export default Signup