// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, Subject, take, tap } from 'rxjs';
// import * as signalR from "@microsoft/signalr"
// import { HttpHeaders } from '@angular/common/http';


// @Injectable({
//   providedIn: 'root'
// })
// export class SignalrService {

//   constructor(private http:signalR.HttpClient) { }

//   hubConnection!: signalR.HubConnection;
//   private baseUrl = 'http://trening.vdsystem.rs:7000/api';
//   private apiKey='1a6a89c3-0de8-4266-aad1-76505c10bb63';
//   private hourlySubjectView =new BehaviorSubject<hourlyData[]>([]);
//   hourlyView$=this.hourlySubjectView.asObservable();

//   private updatedTeam =new BehaviorSubject<string>('');
//   updatedTeam$=this.updatedTeam.asObservable();

//   getHourlyView(team:string){
//     const headers = new HttpHeaders({
//       'ApiKey': `${this.apiKey}`
//     });
//     return this.http.get<hourlyData[]>(`${this.baseUrl}/public/GetHourlyInsertForTeam/${team}`, { headers })
//     .pipe(tap(hourlys=>{
//       this.hourlySubjectView.next(hourlys.sort(sortByProperty('shiftPatternId',true)))
//     }
//     )
//   )
      
// }

//   startConnection = () => {
//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl('http://trening.vdsystem.rs:7000/RefreshData')
//       .withAutomaticReconnect()
//       .build();

//     this.hubConnection
//       .start()
//       .then(() => {
//         console.log(
//           this.hubConnection.connectionId,
//         );
//       })
//       .catch((err) => console.log('Error while starting connection: ' + err));
//       this.addConnectionInv();
//   };
//   addConnectionInv(): void {
//     this.hubConnection.on('InsertedMasterRecord', this.onInserted);
//     this.hubConnection.on('DeletedMasterRecord', this.onDeleted);
//   }
//   stopConnection(): void {
//     this.hubConnection.off('InsertedMasterRecord', this.onInserted);
//     this.hubConnection.off('DeletedMasterRecord', this.onDeleted);

//     this.hubConnection.stop()
//       .then(() => console.log('Connection stopped'))
//       .catch(err => console.log('Error while stopping connection: ' + err));
//   }
//   private onInserted = (hourlys: hourlyData[],teamName:string): void => {
//     console.log('New message received from server:', hourlys);
//     this.hourlySubjectView.next(hourlys);
//     this.updatedTeam.next(teamName);
//     // Process the message further, e.g., display it to the user
//   }

//   private onDeleted = (hourlys: hourlyData[],teamName:string): void => {
//     console.log('New message received from server:', hourlys);
//     this.hourlySubjectView.next(hourlys);
//     this.updatedTeam.next(teamName);
//     // Process the message further, e.g., display it to the user
//   }
//   sortBy(property: keyof hourlyData,order:boolean) {
//     const sortedUsers = [...this.hourlySubjectView.getValue()].sort(sortByProperty(property,order));
//     console.log(this.hourlySubjectView)
//     this.hourlySubjectView.next(sortedUsers);
//   }
// //   async askServer() {
// //     console.log("askServerStart");

// //     await this.hubConnection.invoke("askServer", "hi")
// //         .then(() => {
// //             console.log("askServer.then");
// //         })
// //         .catch(err => console.error(err));

// //     console.log("This is the final prompt");
// // }
// //   addConnectionInv(userID:any): void {
// //     this.hubConnection.invoke("AddConnection", userID)
// //     .catch(err => console.error(err));
// //   }
// }
