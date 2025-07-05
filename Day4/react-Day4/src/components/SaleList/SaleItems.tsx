
import StarRating from '../StarRating';
import styles from './SaleList.module.css'

interface SaleItemsProps {
    thumbnail: string;
    title: string;
    discount?: string;
    price: string;
    oldPrice?: string;
}
const SaleItems = ({
    thumbnail,
    title,
    discount ,
    price,
    oldPrice ,
} : SaleItemsProps) => {
  return (
     <div className={styles.article_item}>
        
        <div className={styles.article_thumbnail}>
          <div className={styles.article_discount}>{discount}</div>
          <img src={thumbnail} alt="" />
        </div>
         <div className={styles.article_extra}>
          <span className={styles.article_price}>{price}</span>{' '}
          <span className={styles.old}>{oldPrice}</span>
        </div>
        <h3 className={styles.article_name}>{title}</h3>
        <StarRating />

     </div>
  )
}

export default SaleItems