import React from 'react';
import s from './Post.module.css';

export type PostType = {
    message: string,
    image?: string
    id: number
    likesCount: number
}

const defaultImage = 'https://img2.freepng.ru/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg';

type PostPropsType = {
    post: PostType
}

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img
                src={defaultImage}
                alt="#"/>

            <div>
                <span>{props.post.message}</span>
            </div>
        </div>
    )
}

export default Post;