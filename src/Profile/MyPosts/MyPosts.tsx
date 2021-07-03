import React from 'react';
import s from './MyPosts.module.css';
import Post, {PostType} from './Post/Post';

// typing data 'posts' witch I get from component Profile
type MyPostsPropsType = {
    posts: Array<PostType>
}

// drawing component MyPosts
const MyPosts = (props: MyPostsPropsType) => {

// declare variable 'postsElements' which create new array based on data props which from component 'Profile'. create with metod map.
// in metod map I will send data with variable 'post'
    let postsElements = props.posts.map(p => <Post post={p}/>)

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
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;