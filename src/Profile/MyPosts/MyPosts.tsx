import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ProfileDataType} from '../../Redux/profile-reducer';
import {AddMessageForm} from '../../components/common/addMessageForm/AddMessageForm';

type MyPostsPropsType= {
    profilePage:ProfileDataType
    addPost:(newMessageTextarea:string)=> void
}
class MyPosts extends React.PureComponent<MyPostsPropsType> {

    render() {
        let postsElements = this.props.profilePage.posts.map(p => <Post key={p.id} post={p}/>)

        const onAddPost = (newMessageTextarea: string) => {
            this.props.addPost(newMessageTextarea)
        }
        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <AddMessageForm callback={onAddPost}/>
                <div className={s.post}>
                    {postsElements}
                </div>
            </div>
        )
    }
}
export default MyPosts;