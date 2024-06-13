import {Comm} from "./comm.js";
import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const comm = new Comm("/dev/ttyUSB1", 5);
rl.question("Enter Message:", async (msg) => {
    await comm.Send(msg);
    console.log(`Message Send: ${msg}`)
    rl.close();
});
