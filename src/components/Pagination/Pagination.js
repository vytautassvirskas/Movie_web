import React from 'react'
import "./Pagination.css"
import toPrev from "../../assets/angle-left.svg"
import toNext from "../../assets/angle-right.svg"


const Pagination = (props) => {
    const {totalPages, currentPage,setCurrentPage} = props;

    const prevPage=()=>{
        if(currentPage>1){
            setCurrentPage((prevPage)=>prevPage-1);
        }
    }

    const nextPage = () => {
        if(currentPage<totalPages){
            setCurrentPage((prevPage)=>prevPage+1);
        }
    }
    
    const pageLimit=5;
    
    //show all page numbers
    // const pageNumbers = [...Array(totalPages+1).keys()].slice(1);

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
            <li className="pagination__item" onClick={prevPage}>
                <button className="pagination__link" >
                    <img src={toPrev} alt="previous page" className="pagination__img"/>    
                </button>
            </li>

            {pageNumbers.map((pgNumber)=>{
                    return(<li key={pgNumber} className={"pagination__item"+(pgNumber===currentPage ? " pagination__item--active" : "")}
                    onClick={()=>setCurrentPage(pgNumber)}
                    >
                        <button className="pagination__link" >{pgNumber}</button>
                    </li>)
            })}

            <li className="pagination__item" onClick={nextPage}>
                <button className="pagination__link" >
                    <img src={toNext} alt="next page" className="pagination__img"/>    
                </button>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination