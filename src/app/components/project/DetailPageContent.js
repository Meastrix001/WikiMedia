import { useFetch } from "../../hooks";
import { useState } from 'react';
import styles from './Details.module.scss';
import styles2 from './CardList.module.scss';
import { ListItem } from ".";
const DetailPageContent = ({ item, type }) => {
  const CREDITS = `https://api.themoviedb.org/3/${type}/${item.id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
  const SIMILAR = `https://api.themoviedb.org/3/${type}/${item.id}/similar?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
  const { data, error, isLoading } = useFetch(CREDITS);
  const { data2 } = useFetch(SIMILAR);
  console.log("credit data",data)
  console.log("similar data", data2)
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);


  const toggleViewCast = () => {
      showAllCast === true ? setShowAllCast(false) : setShowAllCast(true);
  };

  const toggleViewCrew = () => {
      showAllCrew === true ? setShowAllCrew(false) : setShowAllCrew(true);
  };

  return (
    <article className={`${styles.wrapper} ${styles.article}`}>   
      <figure className={styles.hero}>
        <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path !== null ? item.backdrop_path :  item.poster_path }`} alt={item.name} />
      </figure>

      <div className={styles.picture}>
        <p className={styles.rating}>
          <span className={styles.orange}>{item.vote_average}/10 rating out of {item.vote_count} votes</span>
          </p>
        <section>
          <h1 className={styles.title}>{ item.name !== undefined ? item.name : item.title } - {type}</h1>
          <small>{item.episode_run_time !== undefined ? `${item.episode_run_time} min` : item.runtime + " min"} | {item.genres.lenght !== 0 ? 
          item.genres.map(genre => { return( genre.name + " - " ) } ) : "ITEM_LENGHT"} | {type === "tv" ? "TV Serie " + item.episode_run_time : "Movie " + item.release_date}</small>
          <p>{item.overview}</p>
        </section>
      </div>

      { item.number_of_seasons !== undefined ?
      <div className={`${styles.flex} ${styles.seasons}`}>
        
        <div className={styles.padding}>
          <h2>Show lenght:</h2>
          <p><span className={styles.orange}>{item.number_of_seasons} </span>Seasons</p>
          <p><span className={styles.orange}>{item.number_of_episodes}</span> Episodes</p>
        </div>

        <div className={styles.padding}>
          <h2>First And last air date</h2>
          <p>Aired first in: <span className={styles.orange}>{item.first_air_date}</span> </p>
          <p>Aired last on: <span className={styles.orange}>{item.last_air_date}</span></p>
          <p>avg episode lenght: <span className={styles.orange}>{item.episode_run_time}</span> minutes </p>
        </div>

        <div className={styles.padding}>
            { item.next_episode_to_air !== null && item.next_episode_to_air !== undefined?
                  <div>
                    <h2>Next episode  <span className={styles.orange}>"Season {item.next_episode_to_air.season_number} • episode {item.next_episode_to_air.episode_number}"</span> airs on</h2>
                    <p>{item.next_episode_to_air.air_date} • Titled: {item.next_episode_to_air.name}</p>
                  </div> 
          : <h2>Next episode air date not yet know.</h2>
          }
          </div> 

      </div> 
      
      : ""
      
      }

      { item.production_companies !== undefined ?
        <div>
          <h2>Production Companies</h2>
          <ul className={styles.comp}>
            { item.production_companies.map(company => {
              return(
                <li key={company.id}>
                { company.logo_path !== null ?
                  <img alt="company logo" className={styles.compLogo} src={`https://image.tmdb.org/t/p/original${company.logo_path}`}></img> :
                  <img alt="company logo" className={styles.compLogo} src={"https://www.scanningpens.com/c.4437431/site/images/noimage.png"}></img> 
                }
                <p>{company.name}</p>
                </li>
              )
            })}

          </ul>
        </div> 
      : ""
      }

{ data ?

        <div>

            <h2>cast and crew involved</h2>
          <div>
              <h2>Cast</h2>
            <ul className={`${showAllCast ? styles.usersOpen : styles.usersClosed} ${styles.ul}`}>
              { data.cast.length !== 0 ? data.cast.map(member => {
                return(
                  <li key={member.cast_id}>
                     {member.profile_path !== null ? <img alt="" className={styles.userImg} src={`https://image.tmdb.org/t/p/original${member.profile_path}`}></img> : <div className={styles.userImg}></div>}

                    <p>{member.name} <span className={styles.orange}>As</span> {member.character}</p>
                    </li>
                )
              }) : <p>No cast members found</p>}
            </ul>
            <p onClick={toggleViewCast} className={styles.hover}>{showAllCast ? "hide cast members" : "See more cast members"}</p>
          </div>

            <div>
              <h2>Crew</h2>
              <ul className={`${showAllCrew ? styles.usersOpen : styles.usersClosed} ${styles.ul}`}>
              { data.crew.length !== 0 ? data.crew.map(member => {
                return(
                  <li key={member.id}>
                     {member.profile_path !== null ? <img alt="" className={styles.userImg} src={`https://image.tmdb.org/t/p/original${member.profile_path}`}></img> : <div className={styles.userImg}></div>}
                    <p>{member.name} <span className={styles.orange}>Job: </span>{member.department}</p>
                    </li>
                )
                
              }) : <p>No crew members found</p>}
            </ul>
            <p onClick={toggleViewCrew} className={styles.hover}>{showAllCrew ? "hide crew members" : "See more crew members"}</p>
            </div>

        </div> 
      : ""
      }

    <section>
      { data2 ? 
      <div>
        
        <h2>Similar to this:</h2>
        <ul className={`${styles2.cardListClosed} ${styles2.ul}`}>

        {
          data2.results.map(result => {
            return <li className={styles2.list}><ListItem data={result}/></li>
          })
        }
        </ul>
      </div>
      : ""}
    </section>
    </article>
  )
};

export default DetailPageContent;