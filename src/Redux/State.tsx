let rerenderEntireTree = () => {
    console.log('State changed')
}

export type PostType = {
    message: string
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
export type ProfileDataType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsPageDataType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageItemType>
    newMessageTextarea: string
}
export type StateType = {
    profilePage: ProfileDataType
    dialogPage: DialogsPageDataType
}

let state: StateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi', likesCount: 12},
            {id: 2, message: 'How are you', likesCount: 10},
        ],
        newPostText:'it-kamasutra'
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
        ],
        newMessageTextarea:'Hi everyone!'
    }
}


export const addPost = () => {
    let text = state.profilePage.newPostText.trim()
    if (text === '') return

    const newPost: PostType = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }

    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = ''
    rerenderEntireTree();
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree()
}

export const addMessage = () => {
    const text = state.dialogPage.newMessageTextarea.trim()
    if(text === '') return

    const newMessage:MessageItemType = {
        id: 7,
        message: state.dialogPage.newMessageTextarea.trim()
    }
    state.dialogPage.messages.push(newMessage)
    state.dialogPage.newMessageTextarea =''
    rerenderEntireTree()
}

export const onChangeTextareaDialogs = (newTextarea: string) => {
    state.dialogPage.newMessageTextarea = newTextarea
    rerenderEntireTree()
}

export const subscribe = (observer:any) => {
rerenderEntireTree = observer
}

export default state