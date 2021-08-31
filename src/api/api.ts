import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,

})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
            {withCredentials: true})
            // возращаем не то что вернул get а то что вернул then ( возращает другой промис )
            .then(response => response.data)
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
