import { io } from "socket.io-client";
import URL from "./apiURL";

const socket = io(`${URL}`, {
  autoConnect: false,
  auth: { token: null },
  reconnectionDelay: 4000,
  reconnectionDelayMax: 4000,
  reconnectionAttempts: 3,
});

export default socket;
