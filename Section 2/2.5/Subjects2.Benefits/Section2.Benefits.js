// html

<div class="container">
  <div class="switcher">
    <h4 class="title">Step switcher</h4>
    <div class="step-one step active">1</div>
    <div class="step-two step">2</div>
  </div>
  <div class="counter counter1">
    <h4 class="title">Counter</h4>
    <div class="value">0</div>
  </div>
<!--     <div class="counter counter2">
    <h4 class="title">Counter</h4>
    <div class="value">0</div>
  </div>
      <div class="counter counter3">
    <h4 class="title">Counter</h4>
    <div class="value">0</div>
  </div> -->
</div>

//css
.container {
  padding-top: 20px;
}
.switcher {
  display: inline-block;
  vertical-align: text-top;
  width: 200px;
  height: 180px;
  margin: 0 5px;
  border: 1px solid lightblue;
  text-align: center;
}
.switcher .title {
  padding-top: 20px;
  height: 70px;
}

.step {
  float: left;
  width: 50%;
  height: 100px;
  color: white;
  line-height: 100px;
  font-size: 50px;
  text-align: center;
  opacity: .3;
  cursor: pointer;
}

.step:hover {
  outline: 1px solid black;
}
.step-one {
  background-color: green;
}

.step-two {
  background-color: red;
}
.switcher .active {
  opacity: 1;
}

.counter {
  display: inline-block;
  vertical-align: text-top;
  width: 200px;
  height: 180px;
  margin: 0 5px;
  border: 1px solid lightblue;
  text-align: center;
}
.counter .title {
  padding-top: 20px;
  height: 70px;
}
.value {
  float: left;
  width: 100%;
  height: 100px;
  color: black;
  line-height: 100px;
  font-size: 50px;
  text-align: center;
  opacity: 1;
  cursor: pointer;
}

// JS
let Rx = window['rxjs'];
let {Subject} = Rx;

// step switcher
let switcherValueObservable = (function() {  
let switcherSubject = new Subject();
let step1 = document.querySelector('.step-one');
let step2 = document.querySelector('.step-two');
step1.addEventListener('click', (event) => {
  switcherSubject.next(1);
  step1.classList.add('active');
  step2.classList.remove('active');
});
step2.addEventListener('click', (event) => {
  switcherSubject.next(2);
  step1.classList.remove('active');
  step2.classList.add('active');
});

return switcherSubject.asObservable();
})()


//counter
function createCounter(selector, stepObservable) {
  let counter = 0;
  let step = 1;
  
  stepObservable.subscribe((value) => step = value);
  
  let counterElement = document.querySelector(selector + ' .value');
  
  setInterval(() => {
    counter = counter + step
    counterElement.innerHTML = counter;
  }, 1000);
  
}

createCounter('.counter', switcherValueObservable)
//createCounter('.counter2', switcherValueObservable)
//createCounter('.counter3', switcherValueObservable)