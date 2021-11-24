import React,{ useState  } from 'react';
import { useFetch } from "../../../hooks";
import Loading from '../../layout/Loading';
import Error from '../../layout/Error'
import styles from '../CardList.module.scss';
import Search from '../../layout/Search'
import FilterShows from './FilterShows'
import Pagination from '../Pagination'
import { FetchSearchResults } from '../home'



const ShowsList = () => {
  const [text, setText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const ALL_API = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&page=${currentPage}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
  const SEARCH_SHOW = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${currentPage}&query=${text}&include_adult=false`
  const { data, isLoading, error } = useFetch(ALL_API, currentPage);
    console.log(isLoading)
const handleClick = (e) => {    
  // e.preventDefault();    
  setCurrentPage(currentPage + 1 )
}

const handleClickBack = (e) => {    
  // e.preventDefault();    
  setCurrentPage(currentPage - 1)
}

  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Top rated shows</h2>
        <Search setText={setText} />
        { text !== "" ? <FetchSearchResults url={SEARCH_SHOW} string={text}/> : ""

        }
      </div>
    {
      error ? <Error>{error}</Error> : isLoading || !data ? <Loading type="TV-Shows"/> : 
        <div>
          <FilterShows text={text} data={data}/> 
          <Pagination pages={data.total_pages} currentPage={currentPage} handleClick={handleClick} handleClickBack={handleClickBack}/> 
        </div>
    }
    </div>
  );
}

export default ShowsList;