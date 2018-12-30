let Rx = window['rxjs'];
const {Subject} = Rx;
const {take, retry, multicast, refCount, publish, share} = Rx.operators;
const {ajax} = Rx.ajax;
console.clear();


// example 1
const getData = () => ajax('https://www.mocky.io/v2/5beb03262f00004431da3d8f?mocky-delay=3s')

getData().subscribe((data) => console.log('Data for component 1'));

setTimeout(() => {
  getData().subscribe((data) => console.log('Data for component 2'));
}, 1500)


// example 2
let multicaster;
const getDataWrapper = () => {
  if (!multicaster) {
    multicaster = new Subject();
    getData().subscribe((data) => {
      multicaster.next(data);
      multicaster.complete();
      multicaster = undefined;
    });
  }
  return multicaster.asObservable();
}

getDataWrapper().subscribe((data) => console.log('Data for component 1'));

setTimeout(() => {
  getDataWrapper().subscribe((data) => console.log('Data for component 2'));
}, 1500);



// example 3
let connectableObservable = ajax('https://www.mocky.io/v2/5beb03262f00004431da3d8f?mocky-delay=3s')
     .pipe(multicast(new Subject()));
     // .pipe(publish());
console.log('Connectable', connectableObservable );

const getDataMulticast = () => {
  connectableObservable.connect()
  return connectableObservable;
}

getDataMulticast().subscribe((data) => console.log('Data for component 1'));

setTimeout(() => {
  getDataMulticast().subscribe((data) => console.log('Data for component 2'));
}, 1500);



// example 4
let connectableObservable = ajax('https://www.mocky.io/v2/5beb03262f00004431da3d8f?mocky-delay=3s')
.pipe(multicast(new Subject()), refCount());
     // .pipe(publish(), refCount());

const getDataPublish = () => {
  return connectableObservable;
}

getDataPublish().subscribe((data) => console.log('Data for component 1'));

setTimeout(() => {
  getDataPublish().subscribe((data) => console.log('Data for component 2'));
}, 1500);

setTimeout(() => {
  getDataPublish().subscribe((data) => console.log('Data for component 3'));
}, 4000);

// example 5
let connectableObservable = ajax('https://www.mocky.io/v2/5beb03262f00004431da3d8f?mocky-delay=3s')
     .pipe(multicast(() => new Subject()), refCount());
     // .pipe(share());

const getDataPublish = () => {
  return connectableObservable;
}

getDataPublish().subscribe((data) => console.log('Data for component 1'));

setTimeout(() => {
  getDataPublish().subscribe((data) => console.log('Data for component 2'));
}, 1500);

setTimeout(() => {
  getDataPublish().subscribe((data) => console.log('Data for component 3'));
}, 4500);
