import {SerialPort} from "serialport";
import { Transform } from "stream";
import {StreamReader} from "./stream_reader.js";
import {Crypto} from "./lib.js";

export class Comm {
    port;
    writeBuffer;
    pubKey;
    key;
    crypto;

    constructor(path, key) {
        this.writer = new StreamReader();
        this.port = new SerialPort({
            path: path,
            baudRate: 9600,
        });
        this.writeBuffer = [];
        this.crypto = new Crypto(key);
    }

    async Receive() {
        const that = this;
        console.log("Launching Parser")
        const parser = new Transform({
            transform(chunk, encoding, callback) {
                const data = chunk.toString();
                const dataArray = data.split("");
                for (let dataPoint of dataArray) {
                    if(dataPoint === "#") {
                        let count = 0;
                        /*for (let charItem of that.writeBuffer) {
                            if(charItem === '@' && that.writeBuffer[count + 1] === '0') {
                                that.writeBuffer[count] = "#";
                                that.writeBuffer[count + 1] = '';
                            }
                            count++;
                        }*/
                        const msg = that.writeBuffer.join('');
                        const decrypted = that.crypto.decrypt(msg)
                        console.log(`Message: ${decrypted}`);
                        that.writeBuffer = [];
                    }
                    else {
                        that.writeBuffer.push(dataPoint)
                    }
                }
                callback(null, chunk);
            }
        });

        this.port.pipe(parser);
    }

    async Send(msg) {
        //const parsedMsg = msg.replaceAll("#", "@0");

        const encrypted = this.crypto.encrypt(msg);

        const parsed = encrypted.replaceAll("#", "@0")

        const finalMsg = parsed + "#";

        this.port.write(finalMsg, (err) => {
            if (err) {
                console.log('Error on write: ', err.message);
            } else {
                console.log('Message written: ', encrypted);
            }
        });
    }

    Open() {
        this.port.on('open', () => {
            console.log('Port opened successfully');
        });

        this.port.open((err) => {
            if (err) {
                return console.log('Error opening port: ', err.message);
            }
        });
    }
}