import React, {useState} from 'react';
import s from './Paginator.module.css'
import cn from "classnames"


type PaginatorPropsType = {
    pageSize: number
    portionSize: number
    totalItemsCount: number
    currentPage: 1 | number
    onPageChanged: (pageNumber: number) => void

}

export const Paginator = React.memo(({
                                         totalItemsCount,
                                         currentPage,
                                         onPageChanged,
                                         pageSize,
                                         portionSize,
                                         ...props
                                     }: PaginatorPropsType) => {
        const pagesCount = Math.ceil(totalItemsCount / pageSize);
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        const portionCount = Math.ceil(pagesCount / portionSize)
        const [portionNumber, setPortionNumber] = useState(1)
        const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        const rightPortionPageNumber = portionNumber * portionSize

        return (
            <div className={s.paginator}>
                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Prev</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span className={ cn ({
                            [s.selectedPage]:currentPage === p}, s.pageNumber) }
                            // (currentPage === p) ? s.selectedPage : ''

                                     key={p}
                                     onClick={(e) => {
                                         onPageChanged(p)
                                     }}> {p}</span>
                    })}
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Next</button>
                }
            </div>
        )
    }
)