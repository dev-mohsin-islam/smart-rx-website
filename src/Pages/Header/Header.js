
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);


    const logout = () => {
        logOut()
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light position-static">
                <div class="container-fluid">
                    <h2 className='text-success'> <a class="navbar-brand" href="/">Doctors Portal</a></h2>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Consultant</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">About Us</a>
                            </li>

                        </ul>
                        <ul id='patient-area' className='d-flex gap-5'>
                            {
                                user?.uid &&
                                <Link to="/dashboard" className='btn btn-success'>My Dashboard</Link>
                            }
                            {
                                user?.uid ?
                                    <>
                                        <p>{user?.email}</p>

                                        <button onClick={logout} className="btn btn-danger "  >Logout</button>

                                    </>
                                    :
                                    <Link class="btn btn-info text-white" aria-current="page" to="/signUp">Login/Registration</Link>

                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;