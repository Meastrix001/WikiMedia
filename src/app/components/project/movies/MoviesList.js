import React,{ useState } from 'react';
import { useFetch } from "../../../hooks";
import { FetchSearchResults } from '../home'
import Loading from '../../layout/Loading';
import Error from '../../layout/Error'
import Search from '../../layout/Search'
import styles from '../CardList.module.scss';
import FilterMovies from './FilterMovies'
import Pagination from '../Pagination'
const MoviesList =  () => {
  const [text, setText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  
  const ALL_API = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&page=${currentPage}`
    const SEARCH_MOVIES = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${text}&page=${currentPage}&include_adult=false`
      const {data, error, isLoading}= useFetch(ALL_API, currentPage );
      
      const handleClick = (e) => {    
        setCurrentPage(currentPage + 1)
    }

    const handleClickBack = (e) => {    
      setCurrentPage(currentPage - 1)
  }

  return (
    <div className={styles.wrapper}>
      <div>
      <h2>Top rated movies</h2>
      <Search setText={setText} />
      { text !== "" ? <FetchSearchResults url={SEARCH_MOVIES} string={text}/> : ""

    }
      </div>
    {
      error ? <Error>{error}</Error> : isLoading || !data ? <Loading type="movies"/> : 
        <div>
          <FilterMovies text={text} data={data}/>
          <Pagination pages={data.total_pages} currentPage={currentPage} handleClick={handleClick} handleClickBack={handleClickBack}/> 
        </div>
    }
    </div>
  );
}

export default MoviesList;