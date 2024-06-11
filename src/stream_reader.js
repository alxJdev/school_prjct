import * as stream from "node:stream";

export class StreamReader extends stream.Writable{
    WrittenData

    constructor() {
        super({
            write(chunk, encoding, callback) {
                this.WrittenData = chunk.toString();
            }
        })
    }
}