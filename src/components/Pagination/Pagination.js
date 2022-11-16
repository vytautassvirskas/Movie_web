import React from 'react'

import "./Pagination.css"


const Pagination = (props) => {
    const {totalPages, currentPage, setCurrentPage} = props;

    // const pageNumbers = [...Array(totalPages+1).keys()].slice(1);

    const prevPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1);
        }
    }

    const nextPage = () => {
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1);
        }
    }

    const pageLimit=5;

    // const getPaginationGroup = () => {
    //     return [...Array(pageLimit+1).keys()].slice(1);
    // }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        console.log("start", start);
        console.log(new Array(pageLimit).fill().map((number, index) => start + index + 1))
        if(currentPage>3){
            return new Array(pageLimit).fill().map((number, index) => currentPage + index-2);
        }else{
            return new Array(pageLimit).fill().map((number, index) => start + index + 1);
        }
    };

    const pageNumbers= getPaginationGroup();

  return (
    <nav className='pagination'>
        <ul className="pagination__list">
            <li className="pagination__item"
            onClick={prevPage}
            >
                <a className="pagination__link" >
                    
                <svg width="512px" height="512px" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>
                    
                </a>
            </li>
            {pageNumbers.map((pgNumber)=>{
                    return(<li key={pgNumber} className={"pagination__item"+(pgNumber===currentPage ? " pagination__item--active" : "")}
                    onClick={()=>setCurrentPage(pgNumber)}
                    >
                        <a className="pagination__link" >{pgNumber}</a>
                    </li>)
            })}
                    
            <li className="pagination__item"
            onClick={nextPage}
            >
                <a className="pagination__link" >
                <svg width="512px" height="512px" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>
                </a>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination