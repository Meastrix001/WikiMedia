import { useState } from 'react';
import styles from '../CardList.module.scss';
import Pagination from '../Pagination'
import ShowListItem from './ShowListItem';
import { useFetch } from "../../../hooks";
import Loading from '../../layout/Loading';
import Error from '../../layout/Error'
const OnAirShows = ({apiKey}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const MOVIE_TOPRATED = ` https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${currentPage}`
    const { data, isLoading, error } = useFetch(MOVIE_TOPRATED, currentPage);
    const [showAll, setShowAll] = useState(false)
const handleClick = (e) => {    
  setCurrentPage(currentPage + 1)
}

const handleClickBack = (e) => {    
  setCurrentPage(currentPage - 1)
}

const toggleView = () => {
    showAll === true ? setShowAll(false) : setShowAll(true)
};

  return(
    <div>
      <div>
          <h4 id="airingshows">Shows that are currently still airing</h4>
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
        <Pagination catId="#airingshows" currentPage={currentPage} handleClick={handleClick} handleClickBack={handleClickBack}/> 
      </div>
  </div>
  )
};
export default OnAirShows;