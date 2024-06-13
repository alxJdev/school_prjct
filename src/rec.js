import {Comm} from "./comm.js";

const comm = new Comm("/dev/ttyUSB0", 5);
//comm.Open();

await comm.Receive();