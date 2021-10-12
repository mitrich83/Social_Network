import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-key': 'eccbb3eb-58c4-4ed7-895f-7ce56bc6ba31'
    }

})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
          .then(res => res.data)
    },
    follow(userId: number) {
        debugger
        return instance.post(`follow/${userId}`, {}).then(res => res.data)
    },
    unfollow(userId: number) {
        debugger
        return instance.delete(`follow/${userId}`).then(res => res.data)
    },
    getProfile(userId: string) {
        console.warn('Obsolete method. Please use profileApi method')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status});
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string|null, password: string|null, rememberMe: boolean=false) {
        return instance.post('auth/login', {email, password, rememberMe}).then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login').then(res => res.data)
    },
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


