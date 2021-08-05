import profilePageReducer, {addPostActionCreator, changeNewPostActionCreator} from './profilePageReducer';
import dialogPageReducer, {AddMessageActionCreator, changeTextareaDialogsActionCreator} from './dialogPageReducer';

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
            newMessageTextarea: ''
        }
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

        this._state.profilePage = profilePageReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogPageReducer(this._state.dialogPage, action)

        this._callSubscriber(); // (this._state)

    }
}

export default store
// window.store = store

