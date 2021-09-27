import React, {DetailedHTMLProps, TextareaHTMLAttributes} from 'react';
import {Field, Formik} from 'formik';
import s from './addMessageForm.module.css'


type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
// type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
// type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type FormPropsType = DefaultTextareaPropsType & {
    callback: (newMessageTextarea: string) => void
}

export const AddMessageForm = (props: FormPropsType) => {
    const addNewMessage = (values: any) => {
        props.callback(values.newMessage)
    }

    function validateUsername(value:string) {
        let error;
        if (value === '') {
            error = 'Message is required';
        }if ( value.length > 30 ){
            error = 'Max length is 30 symbols '
        }
        return error;
    }

    return (
        <Formik
            initialValues={{newMessage: ''}}

            onSubmit={addNewMessage}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,

              }) => (
                <form onSubmit={handleSubmit}>

                    <div>
                        <div>
                            <Field
                                name="newMessage"
                                component="textarea"
                                placeholder="Enter your message"
                                validate={validateUsername}
                                style={errors.newMessage && touched.newMessage && {border: '2px solid red'}}
                            />
                       </div>
                        <span className={s.error}>{errors.newMessage}</span>
                        <div>
                            <button type="submit" disabled={errors.newMessage ? true : false} >
                                Send
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}
