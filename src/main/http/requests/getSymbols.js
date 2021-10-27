const { netService } = require("../netService");
const { currenciesDS } = require("../dataSources");

class GetSymbols {
  get = (ipcData) => {
    currenciesDS.method = "GET";
    netService.http(ipcData, currenciesDS, "/api/symbols");
  };
}

module.exports = new GetSymbols();
