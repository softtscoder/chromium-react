/* @flow */
/* eslint-disable */
// FIXME(samgoldman) Remove top-level interface once Babel supports
// `declare interface` syntax.
// FIXME(samgoldman) Remove this once rxjs$Subject<T> can mixin rxjs$Observer<T>
interface rxjs$IObserver<-T> {
  closed?: boolean,
  next(value: T): mixed;
  error(error: any): mixed;
  complete(): mixed;
}

type rxjs$PartialObserver<-T> =
  | {
    +next: (value: T) => mixed;
    +error?: (error: any) => mixed;
    +complete?: () => mixed;
  }
  | {
    +next?: (value: T) => mixed;
    +error: (error: any) => mixed;
    +complete?: () => mixed;
  }
  | {
    +next?: (value: T) => mixed;
    +error?: (error: any) => mixed;
    +complete: () => mixed;
  }

interface rxjs$ISubscription {
  unsubscribe(): void;
}

type rxjs$TeardownLogic = rxjs$ISubscription | () => void;

type rxjs$EventListenerOptions = {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
} | boolean;

interface rxjs$Subscribable<T> {
  subscribe(observerOrNext?: rxjs$PartialObserver<T> | ((value: T) => void),
            error?: (error: any) => void,
            complete?: () => void): rxjs$ISubscription;
}


type rxjs$UnaryFunction<T, R> = (source: T) => R;
type rxjs$OperatorFunction<T, R> = rxjs$UnaryFunction<rxjs$Observable<T>, rxjs$Observable<R>>;
type rxjs$FactoryOrValue<T> = T | (() => T);
type rxjs$MonoTypeOperatorFunction<T> = rxjs$OperatorFunction<T, T>;

type rxjs$SubscribableOrPromise<T> = rxjs$Subscribable<T> | Promise<T>;
type rxjs$ObservableInput<T> = rxjs$SubscribableOrPromise<T> | Array<T>;

declare class rxjs$Observable<+T> {
  static create(
    subscribe: (observer: rxjs$Observer<T>) => rxjs$ISubscription | Function | void
  ): rxjs$Observable<T>;

  subscribe(observer: rxjs$PartialObserver<T>): rxjs$Subscription;
  subscribe(
    onNext: ?(value: T) => mixed,
    onError: ?(error: any) => mixed,
    onCompleted: ?() => mixed,
  ): rxjs$Subscription;

  pipe(): rxjs$Observable<T>;
  pipe<A>(op1: rxjs$OperatorFunction<T, A>): rxjs$Observable<A>;
  pipe<A, B>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>): rxjs$Observable<B>;
  pipe<A, B, C>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>, op3: rxjs$OperatorFunction<B, C>): rxjs$Observable<C>;
  pipe<A, B, C, D>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>, op3: rxjs$OperatorFunction<B, C>, op4: rxjs$OperatorFunction<C, D>): rxjs$Observable<D>;
  pipe<A, B, C, D, E>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>, op3: rxjs$OperatorFunction<B, C>, op4: rxjs$OperatorFunction<C, D>, op5: rxjs$OperatorFunction<D, E>): rxjs$Observable<E>;
  pipe<A, B, C, D, E, F>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>, op3: rxjs$OperatorFunction<B, C>, op4: rxjs$OperatorFunction<C, D>, op5: rxjs$OperatorFunction<D, E>, op6: rxjs$OperatorFunction<E, F>): rxjs$Observable<F>;
  pipe<A, B, C, D, E, F, G>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>, op3: rxjs$OperatorFunction<B, C>, op4: rxjs$OperatorFunction<C, D>, op5: rxjs$OperatorFunction<D, E>, op6: rxjs$OperatorFunction<E, F>, op7: rxjs$OperatorFunction<F, G>): rxjs$Observable<G>;
  pipe<A, B, C, D, E, F, G, H>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>, op3: rxjs$OperatorFunction<B, C>, op4: rxjs$OperatorFunction<C, D>, op5: rxjs$OperatorFunction<D, E>, op6: rxjs$OperatorFunction<E, F>, op7: rxjs$OperatorFunction<F, G>, op8: rxjs$OperatorFunction<G, H>): rxjs$Observable<H>;
  pipe<A, B, C, D, E, F, G, H, I>(op1: rxjs$OperatorFunction<T, A>, op2: rxjs$OperatorFunction<A, B>, op3: rxjs$OperatorFunction<B, C>, op4: rxjs$OperatorFunction<C, D>, op5: rxjs$OperatorFunction<D, E>, op6: rxjs$OperatorFunction<E, F>, op7: rxjs$OperatorFunction<F, G>, op8: rxjs$OperatorFunction<G, H>, op9: rxjs$OperatorFunction<H, I>): rxjs$Observable<I>;

  toPromise(): Promise<T>;
}

declare class rxjs$ConnectableObservable<T> extends rxjs$Observable<T> {
  connect(): rxjs$Subscription;
  refCount(): rxjs$Observable<T>;
}

declare class rxjs$Observer<T> {
  next(value: T): mixed;

  error(error: any): mixed;

  complete(): mixed;
}

declare interface rxjs$Operator<T, R> {
  call(subscriber: rxjs$Subscriber<R>, source: any): rxjs$TeardownLogic;
}

// FIXME(samgoldman) should be `mixins rxjs$Observable<T>, rxjs$Observer<T>`
// once Babel parsing support exists: https://phabricator.babeljs.io/T6821
declare class rxjs$Subject<T> extends rxjs$Observable<T> {
  asObservable(): rxjs$Observable<T>;

  observers: Array<rxjs$Observer<T>>;

  unsubscribe(): void;

  // Copied from rxjs$Observer<T>
  next(value: T): mixed;
  error(error: any): mixed;
  complete(): mixed;

  // For use in subclasses only:
  _next(value: T): void;
}

declare class rxjs$AnonymousSubject<T> extends rxjs$Subject<T> {
  source: ?rxjs$Observable<T>;
  destination: ?rxjs$Observer<T>;

  constructor(destination?: rxjs$IObserver<T>, source?: rxjs$Observable<T>): void;
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}

declare class rxjs$BehaviorSubject<T> extends rxjs$Subject<T> {
  constructor(initialValue: T): void;

  get value(): T;
  getValue(): T;
}

declare class rxjs$ReplaySubject<T> extends rxjs$Subject<T> {
  constructor(bufferSize?: number, windowTime?: number, scheduler?: rxjs$SchedulerClass): void;
}

declare class rxjs$Subscription {
  unsubscribe(): void;
  add(teardown: rxjs$TeardownLogic): rxjs$Subscription;
}

declare class rxjs$Subscriber<T> extends rxjs$Subscription {
  static create<T>(
    next?: (x?: T) => void,
    error?: (e?: any) => void,
    complete?: () => void,
  ): rxjs$Subscriber<T>;

  constructor(
    destinationOrNext?: (rxjs$PartialObserver<any> | ((value: T) => void)),
    error?: (e?: any) => void,
    complete?: () => void,
  ): void;
  next(value?: T): void;
  error(err?: any): void;
  complete(): void;
  unsubscribe(): void;
}

declare class rxjs$SchedulerClass {
  schedule<T>(work: (state?: T) => void, delay?: number, state?: T): rxjs$Subscription;
}

declare class rxjs$TimeoutError extends Error {
}

declare module 'rxjs' {
  declare export var Observable: typeof rxjs$Observable;
  declare export var Observer: typeof rxjs$Observer;
  declare export var ConnectableObservable: typeof rxjs$ConnectableObservable;
  declare export var Subject: typeof rxjs$Subject;
  declare export var Subscriber: typeof rxjs$Subscriber;
  declare export var AnonymousSubject: typeof rxjs$AnonymousSubject;
  declare export var BehaviorSubject: typeof rxjs$BehaviorSubject;
  declare export var ReplaySubject: typeof rxjs$ReplaySubject;
  declare export var Scheduler: {|
    asap: rxjs$SchedulerClass,
    queue: rxjs$SchedulerClass,
    animationFrame: rxjs$SchedulerClass,
    async: rxjs$SchedulerClass,
  |};
  declare export var Subscription: typeof rxjs$Subscription;
  declare export var TimeoutError: typeof rxjs$TimeoutError;

  declare export function concat<T>(v1: rxjs$ObservableInput<T>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function concat<T, T2>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2>;
  declare export function concat<T, T2, T3>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3>;
  declare export function concat<T, T2, T3, T4>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4>;
  declare export function concat<T, T2, T3, T4, T5>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4 | T5>;
  declare export function concat<T, T2, T3, T4, T5, T6>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>, v6: rxjs$ObservableInput<T6>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4 | T5 | T6>;
  declare export function concat<T>(...observables: Array<rxjs$ObservableInput<T> | rxjs$SchedulerClass>): rxjs$Observable<T>;
  declare export function concat<T, R>(...observables: Array<rxjs$ObservableInput<any> | rxjs$SchedulerClass>): rxjs$Observable<R>;

  declare export function combineLatest<A, B>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
  ): rxjs$Observable<[A, B]>;
  declare export function combineLatest<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
  ): rxjs$Observable<[A, B, C]>;
  declare export function combineLatest<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
  ): rxjs$Observable<[A, B, C, D]>;
  declare export function combineLatest<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
  ): rxjs$Observable<[A, B, C, D, E]>;
  declare export function combineLatest<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
  ): rxjs$Observable<[A, B, C, D, E, F]>;
  declare export function combineLatest<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
  ): rxjs$Observable<[A, B, C, D, E, F, G]>;
  declare export function combineLatest<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H]>;
  declare export function combineLatest<A, B, C, D, E, F, G, H, I>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
    i: rxjs$Observable<I>,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H, I]>;
  declare export function combineLatest<A, B, C, D, E, F, G, H, I, J>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
    i: rxjs$Observable<I>,
    j: rxjs$Observable<J>,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H, I, J]>;
  declare export function combineLatest<A, B, C, D, E, F, G, H, I, J, K>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
    i: rxjs$Observable<I>,
    j: rxjs$Observable<J>,
    k: rxjs$Observable<K>,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H, I, J, K]>;
  declare export function combineLatest<A, B, C, D, E, F, G, H, I, J, K, L>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
    i: rxjs$Observable<I>,
    j: rxjs$Observable<J>,
    k: rxjs$Observable<K>,
    l: rxjs$Observable<L>,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H, I, J, K, L]>;
  declare export function combineLatest<A, B, C, D, E, F, G, H, I, J, K, L, M>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
    i: rxjs$Observable<I>,
    j: rxjs$Observable<J>,
    k: rxjs$Observable<K>,
    l: rxjs$Observable<L>,
    m: rxjs$Observable<M>,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H, I, J, K, L, M]>;
  declare export function combineLatest<T>(
    array: Array<rxjs$ObservableInput<T>>,
    scheduler?: rxjs$SchedulerClass,
  ): rxjs$Observable<Array<T>>;
  declare export function defer<T>(observableFactory: () => rxjs$Observable<T> | Promise<T>): rxjs$Observable<T>;
  declare export function empty<T>(): rxjs$Observable<T>;
  declare export function fromPromise<T>(promise: Promise<T>): rxjs$Observable<T>;
  declare export function interval(period?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<number>;
  declare export function merge<T>(v1: rxjs$ObservableInput<T>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function merge<T>(v1: rxjs$ObservableInput<T>, concurrent?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function merge<T, T2>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2>;
  declare export function merge<T, T2>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, concurrent?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2>;
  declare export function merge<T, T2, T3>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3>;
  declare export function merge<T, T2, T3>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, concurrent?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3>;
  declare export function merge<T, T2, T3, T4>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4>;
  declare export function merge<T, T2, T3, T4>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, concurrent?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4>;
  declare export function merge<T, T2, T3, T4, T5>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4 | T5>;
  declare export function merge<T, T2, T3, T4, T5>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>, concurrent?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4 | T5>;
  declare export function merge<T, T2, T3, T4, T5, T6>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>, v6: rxjs$ObservableInput<T6>, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4 | T5 | T6>;
  declare export function merge<T, T2, T3, T4, T5, T6>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>, v6: rxjs$ObservableInput<T6>, concurrent?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T | T2 | T3 | T4 | T5 | T6>;
  declare export function merge<T>(...observables: Array<rxjs$ObservableInput<T>>): rxjs$Observable<T>;
  declare export function merge(...observables: Array<rxjs$ObservableInput<any>>): rxjs$Observable<any>;
  declare export function of<T>(item1: T, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function of<T>(item1: T, item2: T, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function of<T>(item1: T, item2: T, item3: T, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function of<T>(item1: T, item2: T, item3: T, item4: T, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, item6: T, scheduler?: rxjs$SchedulerClass): rxjs$Observable<T>;
  declare export function of<T>(...array: Array<T | rxjs$SchedulerClass>): rxjs$Observable<T>;
  declare export function range(start?: number, count?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<number>;
  declare export function throwError(error: Error, scheduler?: rxjs$SchedulerClass): rxjs$Observable<any>;
  declare export function timer(initialDelay?: number, period?: number, scheduler?: rxjs$SchedulerClass): rxjs$Observable<number>;
  declare export function zip<T, T2>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>): rxjs$Observable<[T, T2]>;
  declare export function zip<T, T2, T3>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>): rxjs$Observable<[T, T2, T3]>;
  declare export function zip<T, T2, T3, T4>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>): rxjs$Observable<[T, T2, T3, T4]>;
  declare export function zip<T, T2, T3, T4, T5>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>): rxjs$Observable<[T, T2, T3, T4, T5]>;
  declare export function zip<T, T2, T3, T4, T5, T6>(v1: rxjs$ObservableInput<T>, v2: rxjs$ObservableInput<T2>, v3: rxjs$ObservableInput<T3>, v4: rxjs$ObservableInput<T4>, v5: rxjs$ObservableInput<T5>, v6: rxjs$ObservableInput<T6>): rxjs$Observable<[T, T2, T3, T4, T5, T6]>;
  declare export function zip<T>(array: Array<rxjs$ObservableInput<T>>): rxjs$Observable<Array<T>>;
  declare export function zip<T>(...observables: Array<rxjs$ObservableInput<T>>): rxjs$Observable<Array<T>>;
}

declare module 'rxjs/operators' {
  declare export function bufferTime<T>(bufferTimeSpan: number, bufferCreationInterval?: number, maxBufferSize?: number, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, Array<T>>;
  declare export function catchError<T, R>(selector: (err: Error, caught: rxjs$Observable<T>) => rxjs$ObservableInput<R>): rxjs$OperatorFunction<T, R>;
  declare export function concatAll<T>(): rxjs$OperatorFunction<rxjs$Observable<T>, T>;
  declare export function concatMap<T, R>(project: (value: T, index: number) => rxjs$ObservableInput<R>): rxjs$OperatorFunction<T, R>;
  declare export function debounce<T>(durationSelector: (value: T) => rxjs$SubscribableOrPromise<any>): rxjs$OperatorFunction<T, T>;
  declare export function delay<T>(delay: number | Date, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function distinctUntilChanged<T>(compare?: (x: T, y: T) => boolean): rxjs$OperatorFunction<T, T>;
  declare export function filter<T>(predicate: (value: T, index: number) => boolean, thisArg?: any): rxjs$OperatorFunction<T, T>;
  declare export function finalize<T>(callback: () => void): rxjs$OperatorFunction<T, T>;
  declare export function map<T, U>(f: (value: T) => U): rxjs$OperatorFunction<T, U>;
  declare export function mergeMap<T, R>(project: (value: T, index: number) => rxjs$ObservableInput<R>, concurrent?: number): rxjs$OperatorFunction<T, R>;
  declare export function mergeScan<T, R>(
    accumulator: (acc?: R, value: T) => rxjs$ObservableInput<R>,
    seed?: R,
    concurrent?: number
  ): rxjs$OperatorFunction<T, R>;
  declare export function retry<T>(count?: number): rxjs$OperatorFunction<T, T>;
  declare export function retryWhen<T>(notifier: (errors: rxjs$Observable<Error>) => rxjs$Observable<any>): rxjs$OperatorFunction<T, T>;
  declare export function refCount<T>(): rxjs$OperatorFunction<T, T>;
  declare export function scan<T, R>(accumulator: (acc?: R, value: T, index: number) => R, seed?: R): rxjs$OperatorFunction<T, R>;
  declare export function shareReplay<T>(bufferSize?: number, windowTime?: number, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function skipWhile<T>(predicate: (value: T, index: number) => boolean): rxjs$OperatorFunction<T, T>;
  declare export function startWith<T>(v1: T, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function startWith<T>(v1: T, v2: T, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function startWith<T>(v1: T, v2: T, v3: T, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function startWith<T>(v1: T, v2: T, v3: T, v4: T, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function startWith<T>(v1: T, v2: T, v3: T, v4: T, v5: T, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function startWith<T>(v1: T, v2: T, v3: T, v4: T, v5: T, v6: T, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function startWith<T>(...array: Array<T | rxjs$SchedulerClass>): rxjs$OperatorFunction<T, T>;
  declare export function switchMap<T, R>(project: (value: T, index: number) => rxjs$ObservableInput<R>): rxjs$OperatorFunction<T, R>;
  declare export function take<T>(count: number): rxjs$OperatorFunction<T, T>;
  declare export function takeWhile<T>(predicate: (value: T, index: number) => boolean): rxjs$OperatorFunction<T, T>;
  declare export function timeout<T>(due: number | Date, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, T>;
  declare export function toArray<T>(): rxjs$OperatorFunction<T, Array<T>>
  declare export function publishReplay<T, R>(bufferSize?: number, windowTime?: number, selector?: rxjs$OperatorFunction<T, R>, scheduler?: rxjs$SchedulerClass): rxjs$OperatorFunction<T, R>;
  declare export function repeatWhen<T>(notifier: (notifications: rxjs$Observable<any>) => rxjs$Observable<any>): rxjs$OperatorFunction<T, T>;
}
