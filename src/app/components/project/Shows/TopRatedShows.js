import { useState } from 'react';
import styles from '../CardList.module.scss';
import ShowListItem from './ShowListItem';
import { useFetch } from "../../../hooks";
import {Loading, Error } from '../../layout';
import Pagination from '../Pagination'


const TopRatedShows = ({apiKey}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const MOVIE_TOPRATED = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`
  const [showAll, setShowAll] = useState(false)
  
  const { data, isLoading, error } = useFetch(MOVIE_TOPRATED, currentPage);
  const handleClick = (e) => {    
    setCurrentPage(currentPage + 1)
  }

  const handleClickBack = (e) => {
    setCurrentPage(currentPage - 1)
  }
  const toggleView = (e) => {
    e.preventDefault()
    showAll === true ? setShowAll(false) : setShowAll(true)
  };

  return(
    <div>
      <div>
        <h4 id="topratedshows">Top Rated shows</h4>
        <p onClick={toggleView} className={styles.hover}>{showAll ? "See less" : "See More"}</p>
      </div>
      
      <ul className={`${showAll ? styles.cardListOpen : styles.cardListClosed} ${styles.ul}`}>
            {
            error ? <Error>{error}</Error> : isLoading || !data ? <Loading type="movies"/> :
            data.results.map(show => 
              <li className={styles.list} key={show.id}>
              <ShowListItem  key={show.id} showData={show}/>
            </li>)
          }
      </ul>
      <div className={styles.flex}>
        <p onClick={toggleView} className={styles.hover}>{showAll ? "See less" : ""}</p>
        <Pagination catId="#topratedshows" currentPage={currentPage} handleClick={handleClick} handleClickBack={handleClickBack}/> 
      </div>
    </div>
  )
};
export default TopRatedShows;