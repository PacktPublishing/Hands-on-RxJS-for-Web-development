//html
<div class="container">
    <div class="page-header">
      <h1>RxJS 6 Unsubscribe policy </h1>
      <button class="btn btn-danger destroy">Destroy widget</button>
      <button class="btn btn-success create">Create widget</button>
    </div>    
</div>

<template>
  <div class="row-fluid widget">0</div>
</template>


//css
.destroy, .create {
  width: 49%
}

.widget {
  margin-top: 20px;
  padding: 10px;
  box-shadow: 1px 1px 19px 0px rgba(50, 50, 50, 0.75);
  border-radius: 19px;
}

//js
        let Rx = window['rxjs'];
    const {interval, Subject} = Rx;
    const {takeUntil} = Rx.operators;
    console.clear();

    const buttonDestroy = document.querySelector('.destroy');
    buttonDestroy.addEventListener('click', removeWidget);

    const buttonCreate = document.querySelector('.create');
    buttonCreate.addEventListener('click', addWidget);

    let destroySubject$ = null;

    function addWidget() {
        destroySubject$ = new Subject();
        const templateElem = document.querySelector('template');
        const newWidgetFragment = templateElem.content.cloneNode(true);

        const containerElem = document.querySelector('.container');
        containerElem.appendChild(newWidgetFragment);

        const newElem = containerElem.querySelector('.widget');

        interval(1000).pipe(takeUntil(destroySubject$)).subscribe(
            (value) => {
                newElem.innerHTML = value;
                console.log(value, newElem);
            },
          null,
          () => console.log('Completed')
        );
    }

    function removeWidget() {
      const searchWidgetElem = document.querySelector('.widget');
      
      destroySubject$.next(true);
      destroySubject$.complete();
      
      searchWidgetElem.remove();

    }