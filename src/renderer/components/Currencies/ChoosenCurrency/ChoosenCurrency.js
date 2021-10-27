import Icon from "../Icon";
import styles from "./ChoosenCurrency.module.css";

const ChoosenCurrency = ({ current }) => {
  return (
    <div className={styles.currencyText}>
      <p>
        {current ? (
          <>
            <Icon countryId={current?.country?.toLowerCase()} />
            {` ${current?.fullName} - ${current?.value}`}
          </>
        ) : (
          "Выберите валюту"
        )}
      </p>
    </div>
  );
};

export default ChoosenCurrency;
