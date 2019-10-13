export default class DataManager {
    static instance = null;

    /**
     * @returns {DataManager}
     */
    static getInstance() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager();
        }

        return this.instance;
    };

    pubkeyRSA="-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvHE9m7S/jhcVCkThiCo0\nbW2JloaH+4CeNu1hIvcf2f97IQIwgutowDlH+1EgnPhHlCr0M/Kme2l1ZY9A6qZn\nZiui/M3JoE1xHOxGWA0DH4lfn2PTZvO4H15EAsDSMeytW2eegcRLS2LDFxoDWZ0V\ngeEYeT5yodVpvtgT1couBMxYMGWdUTZsddXNauSjISu4dhRtFcr5JRFY4c1XwKxk\nJgLVK/4gH03k7lxPenHyNDnsqYSex8OYiYeGQFiQ2Mg48lON1aBWj2zlY9PrMkMF\nwHKxSPpGwom/H3KxXMXDT70beuP+/Yg1mFyv3+zetTdlChw6osCPVyqzkt8HZbC5\no7Pb7KRXgSjzXYGz82Fvcy3Q0xihIyivJvQ09omXXm54k4Sv/KM9fytPh+bWYhF9\noV0ClLP20F6e24mn9jlz6k1UGtfR9GArnXRX9xmJq90pzG6VxLVRaIY8aTlFWyLE\nKS3eXHvbU8/UTNy3BIcyjJ7PgqMmkHe0OFfMoNxjtQ1zW5Dx/mKNnrl5rEfv8gi9\nIrZJAthKdxjJde0u2x5MRj4Ch3aKKQsQmEPdcuGROukUuLRwG/3Xqgba0WFxxgX/\n4cbKSk/yQrNo/UejUeV0kwe5nead4kOCmny3XaL6URWDXu7874Y8MpLF6JUE5RsF\n/Drwvi4lkoQTqH80/tFzo6kCAwEAAQ==\n-----END PUBLIC KEY-----";
    privkeyRSA="-----BEGIN PRIVATE KEY-----\n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\nWI+zRCXlxS4ad8jXbL1HfXzP+pQKq+Kw\n-----END PRIVATE KEY-----";


    static storeKeyValue(key, value) {
        // your choice of implementation:
        // check if key is used
        // wrap in try-catch
        // etc.
    };

    static getValueForKey(key) {
        // get the value out for the given key
    };
}
