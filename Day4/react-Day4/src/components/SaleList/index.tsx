import SaleItems from "./SaleItems";
import styles from "./SaleList.module.css";

interface SaleItemProps {
  id: number;
  thumbnail: string;
  discount?: string;
  title: string;
  price: string;
  oldPrice?: string;
}

const SaleList = ({ dataa }: { dataa: SaleItemProps[] }) => {
  return (
    <div className={styles.articles_list}>
      {dataa.length > 0 &&
        dataa.map((article) => {
          return (
            <SaleItems
              key={article.id}
              thumbnail={article.thumbnail}
              discount={article.discount ? article.discount : ""}
              title={article.title}
              price={article.price}
              oldPrice={article.oldPrice ? article.oldPrice : ""}
            />
          );
        })}
    </div>
  );
};

export default SaleList;