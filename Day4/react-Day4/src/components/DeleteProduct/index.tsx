
import styles from './DeleteProduct.module.css'
import DeleteItem from './DeleteItem';


interface DleteItemProps {
  id: number;
  thumbnail: string;
  title: string;
  price: string;
}

type Props = {
  data: DleteItemProps[];
  onRemove: (id: number) => void;
};

const DeleteProduct = ({ data, onRemove }: Props) => {
  return (
    <div className={styles.articles_list}>
      {data.length > 0 ? (
        data.map((article) => (
          <DeleteItem
            key={article.id}
            id={article.id}
            thumbnail={article.thumbnail}
            title={article.title}
            price={article.price}
            onRemove={onRemove}
          />
        ))
      ) : (
        <p>Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default DeleteProduct;