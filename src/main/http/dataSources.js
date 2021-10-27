import path from 'path';
import { config } from './config';

const access_key = config.access_key;

exports.currencyPerCountryDS = {
  baseURL: 'http://country.io',
  accessKey: undefined,
  method: 'GET',
};

exports.currenciesDS = {
  baseURL: 'http://data.fixer.io',
  accessKey: access_key,
  method: 'GET',
};
