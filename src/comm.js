import {SerialPort} from "serialport";
import { Transform } from "stream";
import {StreamReader} from "./stream_reader.js";
import stream from "node:stream";

export class Comm {
    port;
    writerResult;
    constructor(path, writer) {
        this.writer = new StreamReader();
        this.port = new SerialPort({
            path: path,
            baudRate: 9600,
        });
    }

    Receive() {
        const parser = new Transform({
            transform(chunk, encoding, callback) {
                const data = chunk.toString();
                console.log(`Received Data: ${data}`);
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