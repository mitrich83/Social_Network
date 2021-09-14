import axios from 'axios';
import {setAuthUserDataAC} from '../Redux/auth-reducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-key": "eccbb3eb-58c4-4ed7-895f-7ce56bc6ba31"
    }

})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
            {withCredentials: true})
            // возращаем не то что вернул get а то что вернул then ( возращает другой промис )
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`,{}, {withCredentials: true}).
        then(response => {
            return response
        })
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`, {withCredentials: true}).
        then(response => {
            return response
        })
    },
    getProfile(userId: string){
        console.warn('Obsolete method. Please use profileApi method')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: string){
        return instance.get(`profile/`+ userId);
    },
    getStatus(userId: string){
        return instance.get(`profile/status/`+ userId);
    },
    updateStatus(status: string){
        return instance.put(`profile/status`,{status});
    },
}

export const authAPI = {
    me () {
        return instance.get(`/auth/me`, {withCredentials: true})
               }
}


