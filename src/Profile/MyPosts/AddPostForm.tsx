import React from 'react';
import {Field, Form } from 'react-final-form';

type AddPostFormPropsType = {
    addMessage: (newMessageTextarea:string)=> void
}

export const AddPostForm = (props: AddPostFormPropsType) => {
    const addNewMessage = (values:any)=> {
        props.addMessage(values.newMessageTextarea)
    }
    return <div>
        <Form onSubmit={addNewMessage} >
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <Field name="newMessageTextarea" component="textarea" placeholder="Enter your message"/>
                    </div>
                    <div>
                        <button type={"submit"}>Add message</button>
                    </div>
                </form>
            )}
        </Form>
    </div>
}
