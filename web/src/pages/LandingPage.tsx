import React, { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';

import '../styles/pages/landing-page.css';
import api from '../services/api';
import logo from '../assets/images/NPSLogo.svg';
import image from '../assets/images/landingbg.svg';
import landimg2 from '../assets/images/landingBottomBg.png';
import FormField from '../components/FormField';
import useForm from '../hooks/useForm';

function LandingPage() {

    const valoresIniciais = {
        login: '',
        password: '',
    };

    const {
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        clearForm
    } = useForm({
        valoresIniciais,
        validate: (values: any) => {
            const errors: any = {};

            if (values.login.trim() === '') {
                errors.login = 'Login is a required field';
            }
            if (values.password.trim() === '') {
                errors.password = 'Password is a required field';
            }

            return errors;
        },
    });

    const history = useHistory();

    function handleLoginSubmit(event: FormEvent) {
        event.preventDefault();

        const formData = {
            email: values.login,
            password: values.password
        }

        api.post('/users/authenticate', formData).then(res => {
            const { token } = res.data;

            localStorage.setItem('@token', token);
            history.push('company-register');

        }).catch(err => {

            console.log(err.response);

            const { error } = err.response.data;

            alert(error);
        });
    }

    return (
        <div id="landing-content">
            <div className="content">
                <div className="login-warapper">
                    <div className="header-login">
                        <img src={logo} alt="NPS Calculator" />
                    </div>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="login-block">
                            <FiUser size={30} />
                            <FormField
                                label="Login"
                                name="login"
                                type="text"
                                value={values.login}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            // hasError={touched.login && errors.login}
                            />
                        </div>
                        <div className="login-block">
                            <FiLock size={30} />
                            <FormField
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                            // hasError={touched.password && errors.password}
                            />
                        </div>
                        <button type="submit" disabled={errors.login || errors.password}>
                            Confirm
                        </button>
                    </form>

                </div>
                <div className="image-bkg">
                    <h2>
                        Measure and improve customer loyalty with NPS survey application
                    </h2>
                    <div className="landing-img-1">
                        <img src={image} alt="landing" />
                    </div>
                    <div className="landing-img-2">
                        <img src={landimg2} alt="landing" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;