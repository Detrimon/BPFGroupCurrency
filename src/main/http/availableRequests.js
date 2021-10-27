import getCurrencies from './requests/getCurrencies';
import getSymbols from './requests/getSymbols';
import getCurrencyPerCountry from './requests/getCurrencyPerCountry';

export const availableRequests = {
  getCurrencies: getCurrencies,
  getSymbols: getSymbols,
  getCurrencyPerCountry: getCurrencyPerCountry,
};
