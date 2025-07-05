import styles from './DeleteProduct.module.css'

interface DeleteProps {
    id : number;
    thumbnail: string;
    title: string;
    price: string;
    onRemove: (id: number) => void;
}
const DeleteItem = ({ id, thumbnail, title, price, onRemove }: DeleteProps) => {
  return (
    <div className={styles.article_item}>
      <div className={styles.article_thumbnail}>
        <img src={thumbnail} alt={title} />
      </div>
      <h3 className={styles.article_name}>{title}</h3>
      <div className={styles.article_extra}>
        <span className={styles.article_add_time}>{price}</span>
      </div>
      <button className={styles.remove_btn} onClick={() => onRemove(id)}>❌</button>
    </div>
  );
};

export default DeleteItem