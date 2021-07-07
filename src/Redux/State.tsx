export type PostType = {
    message: string,
    image?: string
    id: number
    likesCount: number
}
export type DialogItemType = {
    name: string,
    id: number
}
export type MessageItemType = {
    message: string
    id: number
}
export type ProfilePropsType = {
    posts: Array<PostType>
}
export type DialogsPagePropsType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageItemType>
}
export type StateType = {
    profilePage: ProfilePropsType
    dialogPage: DialogsPagePropsType
}

let state: StateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi', likesCount: 12},
            {id: 2, message: 'How are you', likesCount: 10},
        ]
    },
    dialogPage: {
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Artem'},
            {id: 4, name: 'Sveta'},
            {id: 5, name: 'Yulia'},
            {id: 6, name: 'Sasha'},
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How'},
            {id: 3, message: 'How are you'},
            {id: 4, message: 'yo'},
            {id: 5, message: 'yo'},
            {id: 6, message: 'yo'},
        ]
    }
    }

    export default state