import { API_KEY, PAGE_SIZE } from "../constant/NewsList.js";
import state from "../state/state.js";
import { makeDOM } from "../util/makeDOM.js";

// do something!

const NewsList = $container => {
  const newsListContainer = makeDOM('div', {
    className: 'news-list-container',
  });
  $container.appendChild(newsListContainer);
  
  const articleDOM = makeDOM('article', {
    className: 'news-list',
  });
  newsListContainer.appendChild(articleDOM);

  const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, accusamus provident numquam ipsum alias deleniti ut quibusdam doloremque fugiat voluptas pariatur odit beatae velit illum, porro dolorem! A, aspernatur dignissimos.`;

  const creatNewsItem = (article) => {
    const section = makeDOM('section', {
      className: 'news-item',
    });
  
    const thumbnail = makeDOM('div', {
      className: 'thumbnail',
    });
    
    const thumbnail_a_tag = makeDOM('a', {
      href: article.url,
      target: '_blank',
      rel: 'noopener noreferrer',
    });
    const thumbnail_a_img = makeDOM('img', {
      src: article.urlToImage === null ? `data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==` : article.urlToImage,
      alt: 'thumbnail',
    });
    
    const contents = makeDOM('div', {
      className: 'contents',
    });
    
    const title = makeDOM('h2', {});
    
    const title_a = makeDOM('a', {
      href: article.url,
      target: '_blank',
      rel: 'noopener noreferrer',
      innerHTML: article.title,
    });
    
    const description = makeDOM('p', {
      innerHTML: article.description === null ? lorem : article.description,
    });
    section.appendChild(thumbnail);
    section.appendChild(contents);
    thumbnail.appendChild(thumbnail_a_tag);
    thumbnail_a_tag.appendChild(thumbnail_a_img);
    contents.appendChild(title);
    contents.appendChild(description);
    title.appendChild(title_a);
  
    articleDOM.appendChild(section);
  };

  // const pageSize = 5;
  let page = 1;

  const renderNewsList = async(category) => {
    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`
    try{
      const response = await axios.get(url);
      response.data.articles.forEach(creatNewsItem);
    }
    catch(e){
      console.log(e);
    }
  }
  const initializationNewsList = (category) => {
    page = 1;
    renderNewsList(category);
  };

  initializationNewsList(state.category);


  const scrollObserver = makeDOM('div', {
    className: 'scroll-observer',
  });
  const observerImg = makeDOM('img', {
    src: './img/ball-triangle.svg',
    alt: 'Loading...',
  });
  scrollObserver.appendChild(observerImg);
  newsListContainer.appendChild(scrollObserver);
  // const root = document.getElementById('root');
  const option = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    thredhold: 1,
  }
  const addNewsList = (entries, observer) => { 
    // entries는 IntersectionObserverEntry 객체의 리스트로 배열 형식을 반환합니다.
    entries.forEach(entry => {
      if(entry.isIntersecting){
        console.log(entry);
        console.log(entry.target);
        page++;
        renderNewsList(state.category);
        console.log(page);
      }
    });
  };
  const observer = new IntersectionObserver(addNewsList, option);
  observer.observe(scrollObserver);
  return {
    initializationNewsList: initializationNewsList
  }
};
// globalState.category;

// export const renderNewsList = renderNewsList;
export default NewsList;