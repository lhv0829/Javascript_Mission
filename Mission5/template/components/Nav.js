import { makeDOM } from "../util/makeDOM.js";

// do something!
const Nav = $container => {
  const nav = makeDOM('nav', {
    className: 'category-list',
  });
  $container.appendChild(nav);
  const ul = makeDOM('ul', {});
  nav.appendChild(ul);

  const categoryIdArray = ['all', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  const categoryInnerHTMLArray = ['전체보기', '비즈니스', '엔터테인먼트', '건강', '과학', '스포츠', '기술'];
  
  for(let i = 0; i < categoryIdArray.length; i++){
    const li = makeDOM('li', {
      id: categoryIdArray[i],
      className: 'category-item',
      innerHTML: categoryInnerHTMLArray[i],
    });
    ul.appendChild(li);
  }
  document.getElementById('all').classList.add('active');
};

export default Nav;