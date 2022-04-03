// TODO: finish refactoring this angular stuff, if we need it
export {};
// import { Injectable } from '@angular/core';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
// import { Organization } from '../../models';

// @Injectable({
//   providedIn: 'root',
// })
// export class StorageService {
//   private _locationIdLoc: string = 'lngolastlocationId';
//   private _tokenLocation: string = 'lngoTok';
//   private _impersonateLoc: string = 'lngoImp';
//   private _availOrgLoc: string = 'lngoOrgs';

//   public get authToken(): string {
//     const token: string = localStorage.getItem(this._tokenLocation);
//     if (!!token && token !== 'null') {
//       return token;
//     } else {
//       localStorage.removeItem(this._tokenLocation);
//       return null;
//     }
//   }
//   public set authToken(value: string) {
//     if (value === '' || value === null) {
//       localStorage.removeItem(this._tokenLocation);
//     } else {
//       localStorage.setItem(this._tokenLocation, value);
//     }
//   }

//   public get impersonating(): boolean {
//     return coerceBooleanProperty(localStorage.getItem(this._impersonateLoc));
//   }
//   public set impersonating(value: boolean) {
//     localStorage.setItem(this._impersonateLoc, `${value}`.toLowerCase());
//   }

//   public get availableOrganizations(): Organization[] {
//     try {
//       const data = JSON.parse(localStorage.getItem(this._availOrgLoc));
//       return Array.isArray(data) ? data : [];
//     } catch (e) {
//       return [];
//     }
//   }
//   public set availableOrganizations(value: Organization[]) {
//     localStorage.setItem(this._availOrgLoc, JSON.stringify(value));
//   }

//   public set lastViewedLocationId(id: string) {
//     localStorage.setItem(this._locationIdLoc, id);
//   }

//   public get lastViewedLocationId(): string | null {
//     const id = localStorage.getItem(this._locationIdLoc);
//     if (typeof id === 'string' && id.length > 0) {
//       return id;
//     }
//     return null;
//   }
// }
