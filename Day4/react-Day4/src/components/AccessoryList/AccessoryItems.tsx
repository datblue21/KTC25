import styles from './AccessoryList.module.css'

interface AccessoryItemProps  {
    thumbnail: string;
    title: string;
    discount?: string;
    price: string;
    oldPrice: string;
}
const AccessoryItems = ({
    thumbnail,
    title,
    discount ,
    price,
    oldPrice ,
} : AccessoryItemProps) => {
  return (
     <div className={styles.article_item}>
        
        <div className={styles.article_thumbnail}>
            <div className={styles.article_discount}>{discount}</div>
          <img src={thumbnail} alt="" />
        </div>
        <h3 className={styles.article_name}>
         {title}
        </h3>
        <div className={styles.article_extra}>
          <span className={styles.article_price}>{price}</span>{' '}
        <span className={styles.old}>{oldPrice}</span>

        </div>
      </div>
  )
}

export default AccessoryItems