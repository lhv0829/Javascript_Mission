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
const AnalogClock = $container => {
  // do something!
  const hour = makeDOM('div', {
    className : 'hand hour',
  });
  const minute = makeDOM('div', {
    className : 'hand minute',
  });
  const second = makeDOM('div', {
    className : 'hand second',
  });
  $container.appendChild(hour);
  $container.appendChild(minute);
  $container.appendChild(second);
  let timeDOM = new Array(12);
  for(let i = 0; i < 12; i++){
    timeDOM[i] = makeDOM('div', {
      className : `time time${i + 1}`,
      innerHTML : `|`,
    });
    $container.appendChild(timeDOM[i]);
  }
  // let deg = hour.style.getPropertyValue(--deg);
  // console.log('나오나?deg가?' + deg);
  let deg_hour = getComputedStyle(hour).getPropertyValue('--deg');
  let deg_minute = getComputedStyle(minute).getPropertyValue('--deg');
  let deg_second = getComputedStyle(second).getPropertyValue('--deg');
  console.log(`hour는? ${deg_hour}`);
  console.log(`minute는? ${deg_minute}`);
  console.log(`second는? ${deg_second}`);
  deg_second = setInterval(() => {
    deg_second += 6;
    //hour.setProperty('--deg', deg_hour);
    second.style.setProperty('--deg', deg_second);
  }, 1000);
  deg_minute = setInterval(() => {
    deg_minute += 0.1;
    //hour.setProperty('--deg', deg_hour);
    minute.style.setProperty('--deg', deg_minute);
  }, 1000);
  deg_hour = setInterval(() => {
    deg_hour += 0.5/60;
    //hour.setProperty('--deg', deg_hour);
    hour.style.setProperty('--deg', deg_hour);
  }, 1000);
  

};

export default AnalogClock;
