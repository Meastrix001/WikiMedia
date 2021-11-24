import { useFetch } from "../../../hooks";
import * as Routes from '../../../routes/';
import styles from '../CardList.module.scss';
import { Link } from "react-router-dom";



const BASE_PATH_IAMGE = "https://image.tmdb.org/t/p"
const IMAGE_SIZE = "/w500/"
const LatestRelease = () => {
  const LATEST_MOVIE = `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&backdrop_path=true&language=en-US`
  const { data, isLoading} = useFetch(LATEST_MOVIE);
  return (
    <div className={styles.hero}>
    {
       !data || isLoading ? "" : 
       
        <div className={styles.hero_container}>
          <Link className={styles.link} to={Routes.MOVIE_DETAILS.replace(':id', data.id)}>
          <h3 className={styles.correction}>{data.title}</h3>
          <img alt="" src={data.backdrop_path !==null ? BASE_PATH_IAMGE + IMAGE_SIZE + data.backdrop_path : data.poster_path !== null ? BASE_PATH_IAMGE + IMAGE_SIZE + data.poster_path : "https://wallpapercave.com/wp/wp2732950.gif"}/>
        </Link> 
        </div>
    }
    </div>
  );
}

export default LatestRelease;