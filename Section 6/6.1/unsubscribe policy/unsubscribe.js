//html
<div class="container">
    <div class="page-header">
      <h1>RxJS 6 Unsubscribe policy </h1>
      <button class="btn btn-danger destroy">Destroy widget</button>
      <button class="btn btn-success create">Create widget</button>
    </div>    
</div>

<template>
  <div class="row-fluid main">0</div>
</template>

//css
.destroy, .create {
  width: 49%
}

.main {
  margin-top: 20px;
  padding: 10px;
  box-shadow: 1px 1px 19px 0px rgba(50, 50, 50, 0.75);
  border-radius: 19px;
}
  
  
  //js
      let Rx = window['rxjs'];
    const {interval} = Rx;
    console.clear();

    let subscriptions = [];

    const buttonDestroy = document.querySelector('.destroy');
    buttonDestroy.addEventListener('click', () => {
        removeAllWidgets();
    });

    const buttonCreate = document.querySelector('.create');
    buttonCreate.addEventListener('click', () => {
        for (let i = 0; i < 50; i++) addWidget();

    });

    function addWidget() {
        const templateElem = document.querySelector('template');
        const newWidgetFragment = templateElem.content.cloneNode(true);

        const containerElem = document.querySelector('.container');
        containerElem.appendChild(newWidgetFragment);

        const newElem = containerElem.querySelector('.main:last-child');

        const output$ = interval(1000);

        subscriptions[subscriptions.length] = output$.subscribe(
            (value) => {
                newElem.innerHTML = value;
                console.log(value, newElem);
            }
        );
    }


    function removeAllWidgets() {
       const searchWidgetElems = Array.from(document.querySelectorAll('.main'));
        searchWidgetElems.forEach((elem, index) => {
            subscriptions[index].unsubscribe();
        });

      searchWidgetElems.forEach((elem) => elem.remove());

      subscriptions = [];
    }