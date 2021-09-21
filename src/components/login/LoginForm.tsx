import React from 'react';
import {Field, Formik} from 'formik';


export const LoginForm = () => {
    return (
        <Formik
        initialValues={{login: '', password: '', rememberMe: false}}
         validate={values => {
             const errors = {};
/*             if (!values.login) {
                 errors.login = 'Required';
             } else if (
                 !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
             ) {
                 errors.email = 'Invalid email address';
             }*/
             return errors;
         }}
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
                    <input
                    type="login"
                    name="login"
                    placeholder="Login"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.login}
                />
                </div>
                {errors.login && touched.login && errors.login}
                <div>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                </div>
                <div>
                    <Field type="checkbox" name="rememberMe"/>
                    Remember me
                      {errors.password && touched.password && errors.password}
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>
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
