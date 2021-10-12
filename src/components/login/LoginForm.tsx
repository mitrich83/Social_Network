import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {login} from '../../Redux/auth-reducer';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginForm = () => {
    const dispatch = useDispatch()
    const messageError = useSelector<AppStateType, string>((state) =>state.auth.messageError);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            debugger
            dispatch(login(values.email, values.password, values.rememberMe))
            formik.resetForm();
        },
    })



    return (
        <form onSubmit={formik.handleSubmit}>
                        <div>
                            <input
                                type="email"
                                placeholder="Enter email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{messageError}{formik.errors.email}</div>}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps('password')}
                          />
                            {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            {messageError&&<div style={{color: 'red'}}>{messageError}</div>}
                        </div>

                    <div>
                        <input
                            type="checkbox"
                            checked={formik.values.rememberMe}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        Remember me
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
    )
}
