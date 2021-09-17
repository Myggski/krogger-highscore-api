import { encryptionKey } from '../config';

export const encrypt = (text: string) => {
    const crypto = require('crypto');
    const alg = 'des-ede-cbc';
    const utfKey = Buffer.from(encryptionKey, 'utf-8');
    const iv = Buffer.from('QUJDREVGR0g=', 'base64');

    const cipher = crypto.createCipheriv(alg, utfKey, iv);
    let encoded = cipher.update(text, 'ascii', 'base64');
    encoded += cipher.final('base64');

    return encoded;
}

export const decrypt = (encryptedText: string) => {
    const crypto = require('crypto');
    const alg = 'des-ede-cbc';
    const utfKey = Buffer.from(encryptionKey, 'utf-8');
    const iv = Buffer.from('QUJDREVGR0g=', 'base64');    //This is from c# cipher iv

    const encrypted = Buffer.from(encryptedText, 'base64');
    const decipher = crypto.createDecipheriv(alg, utfKey, iv);
    let decoded = decipher.update(encrypted, 'binary', 'ascii');
    decoded += decipher.final('ascii');

    return decoded;
}