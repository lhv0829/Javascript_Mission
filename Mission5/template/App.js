import { Nav, NewsList } from "./components/index.js";
// import { renderNewsList } from "./components/NewsList.js";
import state from "./state/state.js";
// import state from "./state/state.js";

// do something!
const $container = document.querySelector('#root');

Nav($container);


const stateProxy = new Proxy(state, {
  get: function (target, prop) {
    return Reflect.get(target, prop);
  },
  set: function (target, prop, value) {
    const success = Reflect.set(target, prop, value);
    if (success) {
      notifyObservers(value); // 상태가 변경될 때마다 notify 함수를 호출하여 옵저버 패턴 구현
    }
    return success;
  },
});
const observers = new Set(); // 콜백 함수를 등록할 Set 객체

function observe(callback) {
  observers.add(callback);
}

function unobserve(callback) {
  observers.delete(callback);
}

let newsList = NewsList($container);
function notifyObservers(value) {
  newsList.changeCategory(value);
}

const activeCategory = document.querySelector('.active');
let beforeActiveCategory = activeCategory;
const articleDOM = document.querySelector('.news-list');
document.body.addEventListener('click', e => {
  if(e.target.className === 'category-item'){
    if(beforeActiveCategory !== undefined){
      beforeActiveCategory.classList.remove('active');
    }
    e.target.classList.add('active');
    articleDOM.replaceChildren();
    stateProxy.category = e.target.id;
    beforeActiveCategory = e.target;
  }
});
