import io from 'socket.io-client';
import { API } from './index';

const socket = io(API);

export default socket;
