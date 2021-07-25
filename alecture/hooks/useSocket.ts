import io from 'socket.io-client';
import { useCallback } from 'react';

const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
    }
  }, [workspace]);

  if (!workspace) return [undefined, disconnect];
  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`/ws-${workspace}`, { transports: ['websocket'] });
  }

  return [sockets[workspace], disconnect];
};
export default useSocket;
