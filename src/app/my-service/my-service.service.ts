import {Injectable} from '@angular/core';
import {asyncScheduler, fromEvent, of, from} from 'rxjs';
import {
  map,
  mergeMap,
  repeatWhen,
  delay,
  take,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) {
  }

  getRange() {
    of(0, 1, 2, 3).pipe(
      map(x => x + 1)
    )
  }

  getRangeAsync() {
    return of(0, 1, 2, 3, asyncScheduler)
      .pipe(
        map(x => x + 1)
      )
  }

  getUserPositionDetails(id) {
    return this.getUserInfo(id).pipe(
      mergeMap((user: any) => this.http.get('some_url2?position=' + user.position))
    )
  }

  getUserInfo(id) {
    return this.http.get('user_info_url?userId=' + id);
  }

  getData(timeSec, scheduler = asyncScheduler) {
    return this.http.get('some_url')
      .pipe(
        repeatWhen((notification) => notification.pipe(
          delay(timeSec * 1000, scheduler),
          take(5)
          )
        ))
  }

  getDataNoScheduler(timeSec) {
    return this.http.get('some_url')
      .pipe(
        repeatWhen((notification) => notification.pipe(
          delay(timeSec * 1000),
          take(5)
          )
        ))
  }

  getInputObservable($input) {
    return fromEvent($input, 'keyup').pipe(
      // map(e => e.target.value),
      filter((text: string) => text.length > 2),
      debounceTime(750),
      distinctUntilChanged(),
      switchMap((text) => this.makeWikiSearch(text))
    )
  }

  makeWikiSearch(text) {
    return of(['text1', 'text2', 'text3'])
  }

  getAsyncCodeWithPromise() {
    return from(Promise.resolve('something'));
  }
}
