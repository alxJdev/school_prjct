import {Comm} from "./comm.js";
import {Crypto} from "alxhub_crypto/src/crypto.js";
import * as readline from "node:readline";

const comm = new Comm("/dev/ttyUSB1");
//comm.Open();

await comm.Send("Test Data #1");