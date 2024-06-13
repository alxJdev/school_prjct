import {Comm} from "./comm.js";
import * as readline from "node:readline";

const comm = new Comm("/dev/ttyUSB0");
//comm.Open();

await comm.Receive();