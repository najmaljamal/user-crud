import { Injectable } from '@angular/core';
import { UserData } from '../app.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private usersData$ = new BehaviorSubject<UserData[]>([]);

  constructor() { }

  public get UsersData$(): Observable<UserData[]> {
    return this.usersData$.asObservable();
  }

  public addUser(newUser: UserData): void {
    const updatedUsers = [...this.usersData$.value, newUser];

    this.updateUsers(updatedUsers);
  }

  public modifyUser(id: number, name: string, netPoints: number): void {
    const modifiedUsers = this.usersData$.value.map((user: UserData) => {
      if (user.id === id) {
        const data = { ...user, name, netPoints }
        return { ...user, name, netPoints }
      } else {
        return user;
      }
    });

    this.updateUsers(modifiedUsers);
  }

  public deleteUser(id: number): void {
    const modifiedUsers = this.usersData$.value.filter(user => user.id !== id);

    this.updateUsers(modifiedUsers);
  }

  private updateUsers(users: UserData[]): void {
    const sortedUsers = users.sort((a, b) => a.netPoints - b.netPoints);
    const modifiedUsers = sortedUsers.reduce((prev, currUser, currIndex) => {
      const prevUser = prev.length ? prev[prev.length - 1] : {} as UserData;

      if (currIndex === 0 && currUser.netPoints === sortedUsers[1]?.netPoints) {
        return [...prev, { ...currUser, id: currIndex, rank: 'T1' }] as UserData[];
      } else if (currUser.netPoints === prevUser.netPoints) {
        return [...prev, { ...currUser, id: currIndex, rank: prevUser.rank }] as UserData[];
      } else {
        return [...prev, { ...currUser, id: currIndex, rank: currIndex + 1 }] as UserData[];
      }
    }, [] as UserData[])

    this.usersData$.next(modifiedUsers);
  }
}
