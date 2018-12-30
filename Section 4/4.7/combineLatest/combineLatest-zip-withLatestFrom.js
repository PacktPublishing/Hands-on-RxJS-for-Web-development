//html
<div class="container">    
    <div class="card">
      <div class="card-header">
        <h3>zip - combineLatest - withLatestFrom example</h3>
      </div>
      <div class="card-body main">
        
        <div class="card cities">
          <div class="card-body">
            <div class="card-text"><h3>Cities</h3></div>
            <div class="btn-group btn-group-lg cities" role="group"></div>
          </div>
        </div>
        
        <div class="card coefficients">
          <div class="card-body">
            <div class="card-text"><h3>Coefficients</h3></div>
            <div class="btn-group btn-group-lg coefficients" role="group" ></div>
          </div>
        </div>
        
        <br>
        <div class="card price">
          <div class="card-body">
            <div class="card-text"><h3>Calculated price</h3></div>
            <div class="value">0</div>
            <button class="btn btn-info sms" title="Send price and coefficient">Send with SMS</button>
          </div>
        </div>
        
      </div>
      <div class="card-body loading" style="text-align: center;">Loading...</div>
    </div>
 </div>


//css
.container {
  margin-top: 20px;
  text-align: center;
}

.card-body.main {
  display: none;
}
.loading {
  display: block;
}
.card.cities {
  margin-right: 20px;
  width: 20rem; 
  height: 160px;
  display: inline-block;
  vertical-align:top;
}
.card.coefficients {
  width: 18rem; 
  height: 160px;
  display: inline-block; 
  vertical-align:top;
}

.card.price {
  margin-top: 20px;
  width: 18rem; 
  display: inline-block;
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


//js
let Rx = window['rxjs'];
const {of, Subject, zip, combineLatest, fromEvent} = Rx;
const { ajax } = Rx.ajax;
let {delay, take, withLatestFrom} = Rx.operators;
console.clear();


const httpService = {
  getCitiesInfo: () => {
    //retun ajax('http://back-end.com/get-cities');
    return of({
      London: 25,
      Paris: 30,
      Rome: 35
    }).pipe(delay(1000))
  },
  
  getTaxCoefficients: () => {
    //retun ajax('http://back-end.com/get-coefficients');
    return of([1, 1.2, 1.5]).pipe(delay(1200))
  }
};


const citiesObject$ = httpService.getCitiesInfo();
const coefficientsList$ = httpService.getTaxCoefficients();

zip(citiesObject$, coefficientsList$).pipe(take(1))
.subscribe(() => {
  document.querySelector('.card-body.main').style.display = 'block';
  document.querySelector('.loading').style.display = 'none';
});

// cities switcher
const citiesContainer = document.querySelector('.btn-group.cities');

let citiesObservable$ = (function(citiesObject$, citiesContainer) {  
  citiesContainer.innerHTML = '';
  const citiesSubject = new Subject();
  
  citiesObject$.subscribe((cityObj) => {
      Object.keys(cityObj).forEach((city, index) => {
          let classString = "btn btn-primary";
          if (index === 0) {
            citiesSubject.next(cityObj[city]);
            classString += " active";
          }

          //add button
          const button = document.createElement('button');
          button.innerHTML = city + ' <br> ' + cityObj[city];
          button.className = classString;
          button.addEventListener('click', () => {
            Array.from(citiesContainer.children).forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            citiesSubject.next(cityObj[city]);
          });
          citiesContainer.append(button);
      });
  })

  return citiesSubject.asObservable();
})(citiesObject$, citiesContainer);


// coefficient switcher
const coefficientsContainer = document.querySelector('.btn-group.coefficients');
let coefficientsObservable$ = (function(coefficientsList$, coefficientsContainer) {  coefficientsContainer.innerHTML = '';
  const coefficientsSubject = new Subject();
  
  coefficientsList$.subscribe((coefficientsList) => {
      coefficientsList.forEach((coefficient, index) => {
          let classString = "btn btn-success";
          if (index === 0) {
            coefficientsSubject.next(coefficient);
            classString += " active";
          }
        
         //add button
         const button = document.createElement('button');
          button.innerHTML = coefficient;
          button.className = classString;
          button.addEventListener('click', () => {
            Array.from(coefficientsContainer.children).forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            coefficientsSubject.next(coefficient);
          });
        coefficientsContainer.append(button);
      });
  })

  return coefficientsSubject.asObservable();
})(coefficientsList$, coefficientsContainer);


combineLatest(citiesObservable$, coefficientsObservable$)
.subscribe(([price, coef]) => {
  const valueElement = document.querySelector('.price .value');
  valueElement.innerHTML = parseInt(price, 10) * parseFloat(coef);
})

const smsButton = document.querySelector('.sms');

fromEvent(smsButton,  'click')
  .pipe(
  withLatestFrom(citiesObservable$, coefficientsObservable$)
)
.subscribe(([event, cityValue, coefficient]) => alert('Sending value='+cityValue+' and coef='+coefficient));