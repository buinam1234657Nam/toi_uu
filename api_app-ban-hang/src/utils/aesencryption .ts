import CryptoJS from 'crypto-js';
import { secretKey } from '../constants';
const Encrypt = (word:string) => {
  return CryptoJS.AES.encrypt(word, secretKey).toString();
};

const Decrypt = (word:string) => {
  return CryptoJS.AES.decrypt(word, secretKey).toString(CryptoJS.enc.Utf8);
};

export { Encrypt, Decrypt };