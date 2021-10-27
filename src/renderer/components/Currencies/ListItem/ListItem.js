import Icon from "../Icon";
import styles from "./ListItem.module.css";

const ListItem = ({ item }) => {
  const countryName = item.country?.toLowerCase();
  return (
    <li className={styles.dropbox_item} data-currency={item.shortName}>
      <span className={styles.iconContainer}>
        <Icon countryId={countryName} />
      </span>
      {item.fullName}
    </li>
  );
};

export default ListItem;
