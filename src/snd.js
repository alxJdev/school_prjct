import {Comm} from "./comm.js";

const comm = new Comm("/dev/ttyUSB1");
comm.Open();

comm.Send("TEST stuff#");