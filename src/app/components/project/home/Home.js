import { useState } from 'react';
import { TopRatedMovies, PopularMovies, UpComingMovies} from '../movies'
import { PopularShows, TopRatedShows, OnAirShows} from '../Shows'
import { LatestRelease, FetchSearchResults } from './index'
import { SearchBar } from '../../layout'
import styles from './Home.module.scss';

const Home = () => {
  const [text, setText] = useState("")
  const SEARCH_API = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`
console.log(text)
    return(
      <div className={`${styles.mediaContainer} ${styles.wrapper}`}>
        <div>
          <LatestRelease/>
          <SearchBar setText={setText}/>
        </div>
        { text !== "" ? <FetchSearchResults url={SEARCH_API} string={text}/> : ""

        }
        <h2 >Movies</h2>
        <div>
            <TopRatedMovies apiKey={process.env.REACT_APP_MOVIE_API_KEY}/>
            <PopularMovies apiKey={process.env.REACT_APP_MOVIE_API_KEY}/>
            <UpComingMovies apiKey={process.env.REACT_APP_MOVIE_API_KEY}/>
        </div>
        <h2 >Shows</h2>
        <div>
            <TopRatedShows apiKey={process.env.REACT_APP_MOVIE_API_KEY}/>
            <PopularShows apiKey={process.env.REACT_APP_MOVIE_API_KEY}/>
            <OnAirShows apiKey={process.env.REACT_APP_MOVIE_API_KEY}/>
        </div>
      </div>
    );
    }
export default Home