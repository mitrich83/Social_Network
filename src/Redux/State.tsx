let store = {
    _state:  {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi', likesCount: 12},
                {id: 2, message: 'How are you', likesCount: 10},
            ],
            newPostText: 'it-kamasutra'
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
            newMessageTextarea: 'Hi everyone!'
        },
    },
    getState() {
       return this._state
    },
    _callSubscriber() {
        console.log('State changed')
    },
    addPost() {
        let text = this._state.profilePage.newPostText.trim()
        if (text === '') return

        const newPost: PostType = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = ''
        this._callSubscriber();
    },
    updateNewPostText (newText: string) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber()
    },
    addMessage() {
        const text = this._state.dialogPage.newMessageTextarea.trim()
        if(text === '') return

        const newMessage:MessageItemType = {
            id: 7,
            message: this._state.dialogPage.newMessageTextarea.trim()
        }
        this._state.dialogPage.messages.push(newMessage)
        this._state.dialogPage.newMessageTextarea =''
        this._callSubscriber()
    },
    onChangeTextareaDialogs(newTextarea: string) {
        this._state.dialogPage.newMessageTextarea = newTextarea
        this._callSubscriber()
    },
    subscribe(observer:any) {
        this._callSubscriber = observer
    },
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

export default store
