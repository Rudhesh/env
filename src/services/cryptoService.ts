import CryptoJS from 'crypto-js';

export function encryptString(text: string) {
    const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV as string);
    const cipherText = CryptoJS.AES.encrypt(text, process.env.NEXTAUTH_SECRET as string, { iv });
    return cipherText.toString();
  }
  

  export function decryptString(cipherText: string) {
    const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV as string);
    const decryptedText = CryptoJS.AES.decrypt(cipherText, process.env.NEXTAUTH_SECRET as string, { iv });
    return decryptedText.toString(CryptoJS.enc.Utf8);
  }