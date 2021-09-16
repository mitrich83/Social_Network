import React from 'react';
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
