// TODO: finish refactoring this angular stuff, if we need it
export {};
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { CdkDropList } from '@angular/cdk/drag-drop';

// @Injectable({
//     providedIn: 'root'
// })
// export class TopicDragDropService {
//     // prettier-ignore
//     private _registeredTargets: BehaviorSubject<CdkDropList[]>
//         = new BehaviorSubject<CdkDropList[]>([]);

//     // prettier-ignore
//     private _registeredNavTargets: BehaviorSubject<CdkDropList[]>
//         = new BehaviorSubject<CdkDropList[]>([]);

//     public registeredTargets$: Observable<CdkDropList[]> = this._registeredTargets.asObservable();
//     // prettier-ignore
//     public registeredNavTargets$: Observable<CdkDropList[]>
//         = this._registeredNavTargets.asObservable();

//     public registerTarget(target: CdkDropList): void {
//         this._registeredTargets.next([...this._registeredTargets.value, target]);
//     }
//     public registerNavTarget(target: CdkDropList): void {
//         this._registeredNavTargets.next([...this._registeredNavTargets.value, target]);
//     }

//     public removeTarget(target: CdkDropList): void {
//         const value = this._registeredTargets.value;
//         const targetIndex = value.indexOf(target);
//         if (targetIndex > -1) {
//             this._registeredTargets.next([
//                 ...value.slice(0, targetIndex),
//                 ...value.slice(targetIndex + 1)
//             ]);
//         }
//     }

//     public removeNavTarget(target: CdkDropList): void {
//         const value = this._registeredNavTargets.value;
//         const targetIndex = value.indexOf(target);
//         if (targetIndex > -1) {
//             this._registeredNavTargets.next([
//                 ...value.slice(0, targetIndex),
//                 ...value.slice(targetIndex + 1)
//             ]);
//         }
//     }

//     public clearAllTargets(): void {
//         this._registeredTargets.next([]);
//     }

//     public clearAllNavTargets(): void {
//         this._registeredNavTargets.next([]);
//     }
// }
