import React from 'react';
import {Field, Formik} from 'formik';
import s from './login.module.css'



export const LoginForm = () => {

    function validateInputs(value: string) {
        let error;
        if (value === '' ) {
            error = 'Field is required';
        } if ( value.length > 15 ){
            error = 'Max length is 15 symbols '
        }
        return error;
    }

    return (
        <Formik
            initialValues={{login: '', password: '', rememberMe: false}}

            onSubmit={(values, {setSubmitting}) => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <div
                        ><Field
                            name="login"
                            component="input"
                            placeholder="Enter login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.login}
                            nameInput={'Login'}
                            validate={validateInputs}
                            style={errors.login && touched.login && {border: '2px solid red'}}
                        />
                            <span className={s.error}>{errors.login && touched.login && errors.login}</span>
                        </div>
                        <div>
                            <Field
                                name="password"
                                component="input"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                validate={validateInputs}
                                style={errors.password && touched.password && {border: '2px solid red'}}
                            />
                            <span className={s.error}>
                            {errors.password && touched.password && errors.password}
                        </span>
                        </div>
                    </div>
                    <div>
                        <Field type="checkbox" name="rememberMe"/>
                        Remember me
                    </div>
                    <div>
                        <button type="submit" disabled={errors.login || errors.password ? true : false} >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    )
}


/*
import {Field, Form } from 'react-final-form';


export const LoginForm = () => {
    const onSubmit = () => {

    };
    return <div>
        <Form onSubmit={onSubmit} >
            {props => (
                <form onSubmit={props.handleSubmit}>

                    <div>
                        <Field name="Login" component="input" placeholder="Login"/>
                    </div>
                    <div>
                        <Field name="Password" component="input" placeholder="Password"/>
                    </div>
                    <div>
                        <Field name="checkbox" component="input" type={'checkbox'}/>
                        Remember me
                    </div>
                    <div>
                        <button type={"submit"}>Login</button>
                    </div>
                </form>
            )}
        </Form>
    </div>
}
*/
