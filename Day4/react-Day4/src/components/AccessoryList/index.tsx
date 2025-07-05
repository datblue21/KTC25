import AccessoryItems from "./AccessoryItems";
import styles from "./AccessoryList.module.css";

interface AccessoryItemProps {
  id: number;
  thumbnail: string;
  discount?: string;
  title: string;
  price: string;
  oldPrice?: string;
}

const AccessoryList = ({ dataa }: { dataa: AccessoryItemProps[] }) => {
  return (
    <div className={styles.articles_list}>
      {dataa.length > 0 &&
        dataa.map((article) => {
          return (
            <AccessoryItems
              key={article.id}
              thumbnail={article.thumbnail}
              discount={article.discount ? article.discount : ''}
              title={article.title}
              price={article.price}
              oldPrice={article.oldPrice ? article.oldPrice : ""}
            />
          );
        })}
    </div>
  );
};

export default AccessoryList;