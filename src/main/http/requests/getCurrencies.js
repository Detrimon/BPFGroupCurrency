const { netService } = require("../netService");
const { currenciesDS } = require("../dataSources");

class GetCurrencies {
  get = (ipcData) => {
    currenciesDS.method = "GET";
    netService.http(ipcData, currenciesDS, "/api/latest");
  };
}

module.exports = new GetCurrencies();
