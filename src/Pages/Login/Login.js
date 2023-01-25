import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const { loginWithEmailPass } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        if (email !== "") {
            loginWithEmailPass(email, password)
                .then(res => {
                    console.log(res)
                    navigate('/')
                })
                .then(error => {
                    console.log(error)
                })
        }
    }
    return (
        <div className='d-flex justify-content-center mt-5 bg-dark border rounded p-5'>
            <div class="row">
                <div class="col-12 ">
                    <div className='card p-5 w-75'>
                        <h3>Registration</h3>
                        <hr />
                        <form onSubmit={(event) => handleSignIn(event)}>
                            <div className="mb-3">
                                <label for="exampleFormControlInput2" className="form-label">Email address</label>
                                <input required name='email' type="email" className="form-control" id="" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput2" className="form-label">Password</label>
                                <input required name='password' type="password" className="form-control" id="" placeholder="******" />
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-info text-white'>Submit</button>
                            </div>
                        </form>
                        <p>You have no account? <span><Link to="/registration"  >Please Register</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;