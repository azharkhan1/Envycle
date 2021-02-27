import socketIOClient from "socket.io-client";
import url from '../core/index';

const ENDPOINT = (url);
const socket = socketIOClient(ENDPOINT);
export default socket;