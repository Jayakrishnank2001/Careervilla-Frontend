import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable()

export class WebSocketService {

  socket: Socket;

  constructor() {
    console.log('socket')
    this.socket = io(environments.baseURL)
  }

  sendMessage(data: any): void {
    console.log(data)
    this.socket.emit('send-message', data); // Send a message to the server
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receive-message', (data) => {
        observer.next(data); // Receive messages from the server
      });

      return () => {
        this.socket.off('receive-message'); // Clean up when no longer needed
      };
    });
  }


}