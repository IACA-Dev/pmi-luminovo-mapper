
export class RandomUtils {

    static generateRandomMAC() {
        const characters = 'ABCDEF0123456789';
        let macAddress = '';
        for (let i = 0; i < 12; i++) {
            macAddress += characters.charAt(Math.floor(Math.random() * characters.length));
            if ((i + 1) % 2 === 0 && i < 11) {
                macAddress += ':';
            }
        }
        return macAddress;
    }

    static generateRandomIPv4() {
        return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
    }
}