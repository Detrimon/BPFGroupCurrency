import { useMemo, useState } from "react";
import styles from "./Currencies.module.css";
import ChoosenCurrency from "./ChoosenCurrency";
import ListItem from "./ListItem";
import cn from "classnames";

const Currencies = ({ data }) => {
  const [isDropboxShown, setIsDropboxShown] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState("");
  const [inputValue, setInputValue] = useState("");

  const preparedData = useMemo(() => {
    if (!data.currencies || !data.symbols || !data.currencyPerCountry) return;
    const reverseCurrencyPerCountry = Object.keys(
      data.currencyPerCountry
    ).reduce(
      (result, item) => ({
        ...result,
        [data.currencyPerCountry[item]]: item,
      }),
      {}
    );

    return Object.keys(data.currencies).reduce(
      (result, item) => ({
        ...result,
        [item]: {
          value: data.currencies[item],
          country: reverseCurrencyPerCountry[item],
          shortName: item,
          fullName: data.symbols[item],
        },
      }),
      {}
    );
  }, [data]);

  if (!preparedData)
    return <div>Произошла неизвестная ошибка. Попробуйте позже.. </div>;

  const listItems = Object.keys(preparedData).map((item) => {
    return <ListItem key={item} item={preparedData[item]} />;
  });

  return (
    <div className={styles.container}>
      <ChoosenCurrency current={preparedData[currentCurrency]} />
      <div className={styles.innerContainer}>
        <div className={styles.flexContainer}>
          <input
            type="text"
            value={inputValue}
            className={styles.input}
            disabled
          />
          <button
            styles={styles.btn}
            onClick={() => setIsDropboxShown(!isDropboxShown)}
          >
            Выбрать
          </button>
        </div>
        <div
          className={cn(styles.dropbox, {
            [styles.dropbox_hide]: !isDropboxShown,
          })}
        >
          <ul
            className={styles.dropbox_list}
            onClick={(e) => {
              const sItemCurrency = e.target.closest("li").dataset.currency;
              setInputValue(preparedData[sItemCurrency].fullName);
              setIsDropboxShown(false);
              setCurrentCurrency(sItemCurrency);
            }}
          >
            {listItems}
          </ul>
        </div>
      </div>
      Какой-то другой текст...
    </div>
  );
};

export default Currencies;
