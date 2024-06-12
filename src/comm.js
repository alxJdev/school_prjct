import {SerialPort} from "serialport";
import { Transform } from "stream";
import {StreamReader} from "./stream_reader.js";

export class Comm {
    port;
    writeBuffer;

    constructor(path, writer) {
        this.writer = new StreamReader();
        this.port = new SerialPort({
            path: path,
            baudRate: 9600,
        });
        this.writeBuffer = [];
    }

    Receive() {
        const that = this;
        const parser = new Transform({
            transform(chunk, encoding, callback) {
                const data = chunk.toString();
                const dataArray = data.split("");
                for (let dataPoint of dataArray) {
                    if(dataPoint === "#") {
                        let count = 0;
                        for (let charItem of that.writeBuffer) {
                            if(charItem === '@' && that.writeBuffer[count + 1] === '0') {
                                that.writeBuffer[count] = "#";
                                that.writeBuffer[count + 1] = '';
                            }
                            count++;
                        }
                        console.log(`Recieved Data: ${that.writeBuffer.join('')}`)
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

    Send(msg) {
        this.port.write(msg, (err) => {
            if (err) {
                console.log('Error on write: ', err.message);
            } else {
                console.log('Message written: ', msg);
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