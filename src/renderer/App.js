import { useState, useEffect } from 'react';
import './App.css';
import Currencies from './components/Currencies';
import { v4 as uuidv4 } from 'uuid';

const ipcRenderer = window.ipcRenderer;

const requests = {};

const preparedData = {
  currencies: null,
  symbols: null,
  currencyPerCountry: null,
};

const requestDataThroughIPC = (sAction) => {
  ipcRenderer.send('remoteSend', {
    action: sAction,
    messageId: saveIPCRequests(uuidv4(), sAction),
  });
};

const setRemoteIPCListener = (ipcID, setAppData) => {
  ipcRenderer.on(ipcID, (_, args) => {
    const { messageId, data } = args;
    if (messageId) {
      requests[messageId].status = 'complete';
      requests[messageId].data = JSON.parse(data);
    }

    if (requests[messageId].action === 'getCurrencies') {
      preparedData['currencies'] = requests[messageId].data.rates;
    }

    if (requests[messageId].action === 'getSymbols') {
      preparedData['symbols'] = requests[messageId].data.symbols;
    }

    if (requests[messageId].action === 'getCurrencyPerCountry') {
      preparedData['currencyPerCountry'] = requests[messageId].data;
    }

    setAppData({ ...preparedData });
  });
};

const saveIPCRequests = (messageId, action) => {
  requests[messageId] = {
    action: action,
    status: 'pending',
    data: null,
    error: null,
  };

  return messageId;
};

function App() {
  const [appData, setAppData] = useState(preparedData);

  useEffect(() => {
    setRemoteIPCListener('remoteReply', setAppData);
  }, []);

  useEffect(() => {
    requestDataThroughIPC('getCurrencies');
    requestDataThroughIPC('getSymbols');
    requestDataThroughIPC('getCurrencyPerCountry');
  }, []);

  if (!appData.currencies || !appData.symbols || !appData.currencyPerCountry) {
    return <div>Подождите, загружаются начальные данные... </div>;
  }

  return (
    <div className="App">
      <Currencies data={appData} />
    </div>
  );
}

export default App;
