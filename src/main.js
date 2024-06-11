import {SerialPort} from "serialport";
import {Comm} from "./comm.js";


const comm = new Comm("/dev/ttyUSB0");
comm.Open();


//comm.Receive();


comm.Send("Ey wieso geht das nicht");