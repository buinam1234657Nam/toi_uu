declare module 'react-native-crypto' {
    interface Hash {
      update(data: string | Buffer): Hash;
      digest(encoding?: 'latin1' | 'hex' | 'base64' | 'binary' | undefined): string | Buffer;
    }

    interface Cipher {
      update(data: string, inputEncoding: 'utf8', outputEncoding: 'base64'): string;
      final(outputEncoding: 'base64'): string;
    }

    interface Decipher {
      update(data: string, inputEncoding: 'base64', outputEncoding: 'utf8'): string;
      final(outputEncoding: 'utf8'): string;
    }

    function createHash(algorithm: string): Hash;
    function createCipheriv(algorithm: string, key: Buffer, iv: Buffer): Cipher;
    function createDecipheriv(algorithm: string, key: Buffer, iv: Buffer): Decipher;
    function randomBytes(size: number): Buffer;
     const crypto : any
   export default crypto
  }