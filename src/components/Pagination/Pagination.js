import React from 'react'

import "./Pagination.css"


const Pagination = (props) => {
    const {totalPages, currentPage, setCurrentPage} = props;

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
    
    // const pageNumbers = [...Array(totalPages+1).keys()].slice(1); //first option

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        if(totalPages<=pageLimit){
            return [...Array(totalPages).keys()].map((i) => i + 1)};
    
        //pages numbers changes all the time
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
                <button className="pagination__link" >
                    
                <svg width="512px" height="512px" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>
                    
                </button>
            </li>
            {pageNumbers.map((pgNumber)=>{
                    return(<li key={pgNumber} className={"pagination__item"+(pgNumber===currentPage ? " pagination__item--active" : "")}
                    onClick={()=>setCurrentPage(pgNumber)}
                    >
                        <button className="pagination__link" >{pgNumber}</button>
                    </li>)
            })}
                    
            <li className="pagination__item"
            onClick={nextPage}
            >
                <button className="pagination__link" >
                <svg width="512px" height="512px" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>
                </button>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination