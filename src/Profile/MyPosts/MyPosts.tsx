import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ProfilePropsType} from '../Profile';

// drawing component MyPosts
const MyPosts = (props: ProfilePropsType) => {

// declare variable 'postsElements' which create new array based on data props which from component 'Profile'. create with method map.
// in method map I will send data with variable 'post'

    let postsElements = props.posts.map(p => <Post post={p}/>)

    const addPost = () => {
        props.addPost()
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter') {
            props.addPost()
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}
                              onKeyPress={onKeyPressHandler}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.post}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;