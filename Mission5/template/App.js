import { Nav, NewsList } from "./components/index.js";
import state from "./state/state.js";

// do something!
const $container = document.querySelector('#root');

Nav($container);

let newsList = NewsList($container);

const stateProxy = new Proxy(state, {
  get: function (target, prop) {
    return Reflect.get(target, prop);
  },
  set: function (target, prop, value) {
    const success = Reflect.set(target, prop, value);
    if (success) {
      notifyObservers(value);
    }
    return success;
  },
});
const observers = new Set();

function observe(callback) {
  observers.add(callback);
}

function unobserve(callback) {
  observers.delete(callback);
}

function notifyObservers(value) {
  newsList.changeCategory(value);
}

const activeCategory = document.querySelector('.active');
let beforeActiveCategory = activeCategory;

document.body.addEventListener('click', e => {
  if(e.target.className === 'category-item'){
    if(beforeActiveCategory !== undefined){
      beforeActiveCategory.classList.remove('active');
    }
    e.target.classList.add('active');
    stateProxy.category = e.target.id;
    beforeActiveCategory = e.target;
  }
});
