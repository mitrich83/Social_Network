import React from 'react';
import {Field, Formik} from 'formik';

type FormPropsType = {
    callback: (newMessageTextarea: string) => void
}

export const AddMessageForm = (props: FormPropsType) => {
    const addNewMessage = (values: any) => {
        props.callback(values.newMessage)
    }
    return (
        <Formik
            initialValues={{newMessage: ''}}
/*            validate={values => {
                const errors = {errorMessage: ''};
                if (!values.newMessage) {
                    errors.errorMessage = 'Required';
                }
                return errors;
            }}*/
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

                            />
                       </div>
                        <div>
                            <button type="submit">
                                Send
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}
