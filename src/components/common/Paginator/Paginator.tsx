import React from 'react';
import s from './Paginator.module.css'

type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: 1 | number
    onPageChanged: (pageNumber: number) => void

}

export const Paginator = React.memo(({totalUsersCount, currentPage, onPageChanged,pageSize,...props}: PaginatorPropsType) => {
        const pagesCount = Math.ceil(totalUsersCount / pageSize);
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div>
                {pages.map(p => {
                    return <span className={(currentPage === p) ? s.selectedPage : ''}
                                 onClick={() => {
                                     onPageChanged(p)
                                 }}> {p}</span>
                })}
            </div>
        )
    }
)