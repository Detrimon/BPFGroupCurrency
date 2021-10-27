const { netService } = require("../netService");
const { currencyPerCountryDS } = require("../dataSources");

class GetCurrencyPerCountry {
  get = (ipcData) => {
    currencyPerCountryDS.method = "GET";
    netService.http(ipcData, currencyPerCountryDS, "/currency.json");
  };
}

module.exports = new GetCurrencyPerCountry();
