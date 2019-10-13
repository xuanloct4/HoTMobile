import { RSA, RSAKeychain } from 'react-native-rsa-native';
import DataManager from '../app_data/DataManager'

export default class RSAUtils {
    static async encrypt(message) {
        var rsaKey = DataManager.getInstance().pubkeyRSA;
        return await RSA.encrypt(message, rsaKey);
    }

    static async decrypt(message) {
        var rsaKey = DataManager.getInstance().privkeyRSA;
        return await RSA.decrypt(message, rsaKey);
    }


    static async gen() {
        let message = "my secret message";

        RSA.generateKeys(4096) // set key size
            .then(keys => {
                console.log('4096 private:', keys.private); // the private key
                console.log('4096 public:', keys.public); // the public key
                RSA.encrypt(message, keys.public)
                    .then(encodedMessage => {
                        console.log(`the encoded message is ${encodedMessage}`);
                        RSA.decrypt(encodedMessage, keys.private)
                            .then(decryptedMessage => {
                                console.log(`The original message was ${decryptedMessage}`);
                            });
                    });
            });
    }

    async main() {
        let keyTag = 'com.domain.mykey';
        let message = "message to be verified";

        let publicKey = await generateKeyPair(keyTag);
        // Share the generated public key with third parties as desired.

        let messageSignature = await RSAKeychain.sign(message, keyTag);

        if (await RSAKeychain.verify(messageSignature, message, keyTag)) {
            // The signature matches: trust this message.
        } else {
            // The signature does not match.
        }

        await RSAKeychain.deletePrivateKey(keyTag);
    }

    async generateKeyPair(keyTag: string) {
        let keys = await RSAKeychain.generate(keyTag);
        return keys.public;
    }
}
