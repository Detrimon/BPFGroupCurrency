import { net } from 'electron';

class NetService {
  http = (ipcData, config, path) => {
    const sParams = config.accessKey ? `?access_key=${config.accessKey}` : '';

    const request = net.request({
      method: config.method,
      url: `${config.baseURL}${path}${sParams}`,
    });

    console.log(`${config.baseURL}${path}${sParams}`);

    request.setHeader('Content-type', 'application/json');

    request.on('response', (response) => {
      response.on('data', (chunk) => {
        ipcData.event.reply('remoteReply', {
          data: `${chunk}`,
          messageId: ipcData.messageId,
        });
      });
      response.on('end', () => {
        console.log('No more data in response.');
      });
    });
    request.end();
  };
}

exports.netService = new NetService();
