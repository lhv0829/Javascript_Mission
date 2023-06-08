import { API_KEY, PAGE_SIZE } from "../constant/NewsList.js";
import { makeDOM } from "../util/makeDOM.js";

// do something!

const NewsList = ($container) => {
  const newsListContainer = makeDOM("div", {
    className: "news-list-container",
  });
  $container.appendChild(newsListContainer);

  const articleDOM = makeDOM("article", {
    className: "news-list",
  });
  newsListContainer.appendChild(articleDOM);

  const creatNewsItem = (article) => {
    const section = makeDOM("section", {
      className: "news-item",
    });

    const thumbnail = makeDOM("div", {
      className: "thumbnail",
    });

    const thumbnail_a_tag = makeDOM("a", {
      href: article.url,
      target: "_blank",
      rel: "noopener noreferrer",
    });
    const thumbnail_a_img = makeDOM("img", {
      src: article.urlToImage === null ? `data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==` : article.urlToImage,
      alt: "thumbnail",
    });

    const contents = makeDOM("div", {
      className: "contents",
    });

    const title = makeDOM("h2", {});

    const title_a = makeDOM("a", {
      href: article.url,
      target: "_blank",
      rel: "noopener noreferrer",
      innerHTML: article.title,
    });

    const description = makeDOM("p", {
      innerHTML: article.description === null ? "" : article.description,
    });
    description.style.minHeight = "60px";
    console.log(description.style.height);

    section.appendChild(thumbnail);
    section.appendChild(contents);
    thumbnail.appendChild(thumbnail_a_tag);
    thumbnail_a_tag.appendChild(thumbnail_a_img);
    contents.appendChild(title);
    contents.appendChild(description);
    title.appendChild(title_a);

    articleDOM.appendChild(section);
  };

  let page = 1;
  let category = "all";

  const renderNewsList = async (category) => {
    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
      category === "all" ? "" : category
    }&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      response.data.articles.forEach(creatNewsItem);
      page++;
    } catch (e) {
      console.log(e);
    }
  };
  const changeCategory = (selectedCategory) => {
    category = selectedCategory;
    page = 1;
    articleDOM.innerHTML = "";
  };

  const scrollObserver = makeDOM("div", {
    className: "scroll-observer",
  });
  const observerImg = makeDOM("img", {
    src: "./img/ball-triangle.svg",
    alt: "Loading...",
  });
  scrollObserver.appendChild(observerImg);
  newsListContainer.appendChild(scrollObserver);

  const option = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry.isIntersecting);
      if (entry.isIntersecting) {
        renderNewsList(category);
        console.log(page);
      }
    });
  }, option);
  observer.observe(scrollObserver);
  return {
    changeCategory: changeCategory,
  };
};
export default NewsList;
