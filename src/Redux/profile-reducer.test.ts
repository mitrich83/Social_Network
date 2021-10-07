import profileReducer, {addPostActionCreator, deletePost, ProfileType} from './profile-reducer';
import {v1} from 'uuid';

it( 'new post should be added', ()=> {
    // 1. test data
    let action =  addPostActionCreator('it-kamasutra')
    let state = {
        posts: [
            {id: v1(), message: 'Hi', likesCount: 12},
            {id: v1(), message: 'How are you', likesCount: 10},
        ],
        profile: {
            photos: {
                large: '',
                small: ''
            }
        } as ProfileType,
        status: '',
    }
    // 2. action
    let newState =  profileReducer(state, action)

    // 3. expectation
  expect(newState.posts.length).toBe(3)
  expect(newState.posts[0].message).toBe('it-kamasutra')

})

it( 'after deleting length of post should be decremented', ()=> {
    // 1. test data
    let action =  deletePost('Hi')
    let state = {
        posts: [
            {id: v1(), message: 'Hi', likesCount: 12},
            {id: v1(), message: 'How are you', likesCount: 10},
        ],
        profile: {
            photos: {
                large: '',
                small: ''
            }
        } as ProfileType,
        status: '',
    }
    // 2. action
    let newState =  profileReducer(state, action)

    // 3. expectation
  expect(newState.posts[0].message).not.toBe('Hi')
  expect(newState.posts.length).toBe(1)

})
