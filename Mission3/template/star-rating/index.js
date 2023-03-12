// do something!
const makeDOM = (domType, propertyMap) => {
  // domType : div, a, li...
  // propertyMap : {"className" : "product-card", "alt" : ...}
  // Object.keys(propertyMap) -> ["className", "alt"]
  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => {
    dom[key] = propertyMap[key];
  });
  return dom;
};

const StarRating = $container => {
  const maxRating = parseInt($container.dataset.maxRating);
  const starRatingContainer = makeDOM('div', {
    className: 'star-rating-container',
  })
  for(let i = 0 ; i < maxRating; i++){
    const star = makeDOM('i', {
      className: 'bx bxs-star',
    });
    starRatingContainer.appendChild(star);
  }
  $container.appendChild(starRatingContainer);

  $container.addEventListener('mouseover', e => {
    const idx = [...starRatingContainer.children].indexOf(e.target);
    for(let i = 0; i <= idx; i++){
      [...starRatingContainer.children][i].classList.add('hovered');
  }
});
  $container.addEventListener('click', e => {
    const idx = [...starRatingContainer.children].indexOf(e.target);
    const leng = [...starRatingContainer.children].length;
    for(let i = 0; i <= idx; i++){
      [...starRatingContainer.children][i].classList.add('selected');
    }
    for(let i = idx + 1; i < leng; i++){
      [...starRatingContainer.children][i].classList.remove('selected');
    }
    const event = new CustomEvent('rating-change', {detail: idx + 1});
    $container.dispatchEvent(event);
  });
  $container.addEventListener('mouseout', e => {
    const idx = [...starRatingContainer.children].indexOf(e.target);
    for(let i = 0; i <= idx; i++){
      [...starRatingContainer.children][i].classList.remove('hovered');
  }
  });
  const linkDOM = makeDOM('link', {
    href: "star-rating/theme.css",
    rel: "stylesheet",
  });
  const beforeLink = document.getElementsByTagName('link')[1];
  beforeLink.after(linkDOM);
};


export default StarRating;
