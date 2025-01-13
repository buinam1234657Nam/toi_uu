import { secretKey } from '@/constants';
import CryptoJS from 'crypto-js';
const Encrypt = (word:string) => {
  return CryptoJS.AES.encrypt(word, secretKey).toString();
};

const Decrypt = (word:string) => {
  return CryptoJS.AES.decrypt(word, secretKey).toString(CryptoJS.enc.Utf8);
};

export { Encrypt, Decrypt };