import {Comm} from "./comm.js";
import {Crypto} from "alxhub_crypto/src/crypto.js";
import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const comm = new Comm("/dev/ttyUSB1");
rl.question("Enter Message:", async (msg) => {
    await comm.Send(msg);
    console.log(`Message Send: ${msg}`)
    rl.close();
});
