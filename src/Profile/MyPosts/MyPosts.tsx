import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ProfileDataType} from '../../Redux/profilePageReducer';

type MyPostsPropsType= {
    profilePage:ProfileDataType
    onPostChange: (newText:string)=> void
    addPost:()=> void
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.profilePage.posts.map(p => <Post key={p.id} post={p}/>)

    const onAddPost = () => {
        props.addPost()
    }

    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.currentTarget.value
        props.onPostChange(newText)

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
                              value={props.profilePage.newPostText}
                              onKeyPress={onKeyPressHandler}
                    />
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.post}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;