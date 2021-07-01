import React from 'react';
import s from './Post.module.css';

type PostType = {
    message: string
}
const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img
                src="https://img2.freepng.ru/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg"
                alt="#"/>

            <div>
                <span>{props.message}</span>
            </div>
        </div>
    )
}

export default Post;