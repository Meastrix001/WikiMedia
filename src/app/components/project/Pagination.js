import styles from './Pagination.module.scss';

const Pagination = ({catId, pages, currentPage, handleClick, handleClickBack}) => {
  return (
    <div className={styles.paging}>
      { currentPage !== 1 ?
      <a className={`${styles.pageNumber} ${styles.flex} ${styles.hover}`} href={catId} onClick={handleClickBack}>
        <h4>{currentPage - 2 > 0 ? currentPage -2 : ""}</h4>
        <h4>{currentPage - 1 > 0 ? currentPage -1 : 0}</h4>
        <h4> last page</h4>
      </a> : ""
      }

      <h4 className={styles.pageNumber}>{currentPage}</h4>

      { currentPage !== pages ?

      <a className={`${styles.pageNumber} ${styles.flex} ${styles.hover}`} href={catId} onClick={handleClick}>
        <h4> Next page</h4>
        <h4>{currentPage !== pages ? currentPage + 1 : ""}</h4>
        <h4>{currentPage + 2 !== pages ? currentPage + 2 : ""}</h4>
      </a>
       : ""}
    </div>
  )
}
export default Pagination