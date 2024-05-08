import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { type Socket, io } from 'socket.io-client';


@Injectable()

export class WebSocketService {

  socket!: Socket;

  connectSocket(id: string): void {
    this.socket = io('ws://localhost:3001', { query: { id } })
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data) => {
        subscribe.next(data)
      })
    })
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data)
  }

  disconnectSocket(): void {
    this.socket.disconnect()
  }


}