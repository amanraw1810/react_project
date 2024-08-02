import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'





const Login = () => {
    const [state, setState] = useState({
        email_id: '',
        pass: ''
    })
    const _useNavigate = useNavigate()

    const handler = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })

    }
    const loginData = (event) => {
        event.preventDefault()
        console.log(state);
        axios.post("http://localhost:4004/login", state)
            .then((res) => {
                // console.log(res);
                if (res.data.success) {
                    localStorage.setItem('_token', res.data.token)
                    _useNavigate("/")
                }
                else {
                    console.log("username or password is worng");
                }


            })
    }
    return (
        <>
            <div className="container">
                <div className="row mt-4 pb-4">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 border 1px solid" >
                        <div>
                            <h1 className='text-center'>Log In</h1>

                            <div className='text-center mt-5' >
                                <form action="" method='post' onSubmit={loginData} encType='multipart/form-data'>
                                    <input type="text" name="email_id" placeholder='username' onChange={handler} />
                                    <br />
                                    <br />
                                    <input type="password" name="pass" onChange={handler} placeholder='Enter Password' />
                                    <br />
                                    <br />
                                    <input type="submit" value="Login" className='btn btn-danger ' /><br />
                                    <span>
                                        <Link to="" style={{ textDecoration: "none" }}>Forgot Password</Link>&nbsp;|&nbsp;
                                        <Link to="/sign-up" style={{ textDecoration: "none" }}>Sign Up</Link>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default Login
