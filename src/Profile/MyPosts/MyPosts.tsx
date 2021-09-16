import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ProfileDataType} from '../../Redux/profile-reducer';
import {DialogForm} from '../../Dialogs/DialogForm';

type MyPostsPropsType= {
    profilePage:ProfileDataType
    addPost:(newMessageTextarea:string)=> void
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.profilePage.posts.map(p => <Post key={p.id} post={p}/>)

    const onAddPost = (newMessageTextarea:string) => {
        props.addPost(newMessageTextarea)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <DialogForm addMessage={onAddPost}/>
            <div className={s.post}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;