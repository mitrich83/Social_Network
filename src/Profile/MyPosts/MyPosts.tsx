import React from 'react';
import s from './MyPosts.module.css';
import Post, {PostType} from './Post/Post';

type MyPostsPropsType = {

}

const MyPosts = (props: MyPostsPropsType) => {

    let postsData: Array<PostType> = [
        {id: 1, message: 'Hi', likesCount: 12},
        {id: 2, message: 'How are you', likesCount: 10},
    ]

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.post}>
                <Post post={postsData[0]}/>
                <Post post={postsData[1]}/>
            </div>
        </div>
    )
}

export default MyPosts;