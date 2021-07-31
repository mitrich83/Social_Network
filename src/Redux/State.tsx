const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_TEXTAREA_DIALOGS = 'CHANGE-TEXTAREA-DIALOGS'

export type StoreType = {
    _state:StateType
    _callSubscriber: ()=> void
    getState:()=> StateType
    subscribe:(observer:any)=> void
    dispatch:(action:ActionTypes)=> void
}

export type StateType = {
    profilePage: ProfileDataType
    dialogPage: DialogsPageDataType
}

export type DialogsPageDataType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageItemType>
    newMessageTextarea: string
}
export type ProfileDataType = {
    posts: Array<PostType>
    newPostText: string
}

export type DialogItemType = {
    name: string,
    id: number
}
export type MessageItemType = {
    message: string
    id: number
}

export type PostType = {
    message: string
    image?: string
    id: number
    likesCount: number
}

export type ActionTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof changeNewPostActionCreator> |
    ReturnType<typeof AddMessageActionCreator> |
    ReturnType<typeof changeTextareaDialogsActionCreator>

export const addPostActionCreator = () => ({type: 'ADD-POST'} as const)
export const changeNewPostActionCreator = (newText:string) =>
    ({type:'CHANGE-NEW-POST-TEXT', newText: newText} as const)
export const AddMessageActionCreator = ()=> ({type: 'ADD-MESSAGE'} as const)
export const changeTextareaDialogsActionCreator = (newTextarea: string) =>
    ({type: 'CHANGE-TEXTAREA-DIALOGS', newTextarea: newTextarea} as const)

let store:StoreType = {
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
    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
       return this._state
    },
    subscribe(observer:any) {
        this._callSubscriber = observer
    },

    dispatch(action ){
        if(action.type === ADD_POST){
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
        } else if (action.type === CHANGE_NEW_POST_TEXT){
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        } else if (action.type === ADD_MESSAGE){
            const text = this._state.dialogPage.newMessageTextarea.trim()
            if(text === '') return

            const newMessage:MessageItemType = {
                id: 7,
                message: this._state.dialogPage.newMessageTextarea.trim()
            }
            this._state.dialogPage.messages.push(newMessage)
            this._state.dialogPage.newMessageTextarea =''
            this._callSubscriber()
        } else if (action.type === CHANGE_TEXTAREA_DIALOGS) {
            this._state.dialogPage.newMessageTextarea = action.newTextarea
            this._callSubscriber()
        }
    }
}

export default store
