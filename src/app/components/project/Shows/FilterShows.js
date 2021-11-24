import styles from '../CardList.module.scss';
import ListItem from '../ListItem'
const filterShows = ({data}) => {
return (
    <ul className={styles.ul}>
      { data.results.map(show => 
      <li key={show.id} className={styles.list}>
        <ListItem  key={show.id} data={show}/>
      </li>)
      }
    </ul>
    
  )
}
export default filterShows