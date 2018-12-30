let Rx = window['rxjs'];
let {range} = Rx;
let {map} = Rx.operators;

class SomeService {
  getRange() {
    return range(0, 4).pipe(
      map(this.multiplyByTwo)
    )
  }
  
  multiplyByTwo(x) {
    return x*2
  }
}

let serviceInstance = new SomeService();
serviceInstance.getRange()
.subscribe(
    (data) => console.log(data)
);