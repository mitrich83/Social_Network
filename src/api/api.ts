import axios from 'axios';

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
    }
}
/*
export const followUsers = ( )=> {
    return instance.post(`follow/${u.id}`, {})
        .then(response => {
            if(response.data.resultCode === 0){
                props.follow(u.id)
            }
        })
}*/
