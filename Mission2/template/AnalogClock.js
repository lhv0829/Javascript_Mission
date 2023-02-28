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
  const hand_hr = makeDOM('div', {
    className : 'hand hour',
  });
  const hand_min = makeDOM('div', {
    className : 'hand minute',
  });
  const hand_sec = makeDOM('div', {
    className : 'hand second',
  });
  $container.appendChild(hand_hr);
  $container.appendChild(hand_min);
  $container.appendChild(hand_sec);
  
  for(let i = 0; i < 12; i++){
    const time = makeDOM('div', {
      className : `time time${i + 1}`,
      innerHTML : `|`,
    });
    $container.appendChild(time);
  }
  let deg_hr = getComputedStyle(hand_hr).getPropertyValue('--deg');
  let deg_min = getComputedStyle(hand_min).getPropertyValue('--deg');
  let deg_sec = getComputedStyle(hand_sec).getPropertyValue('--deg');

  let date = new Date();
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  deg_hr = hr * 30 + min * 0.5 + sec * (0.5 / 60);
  deg_min = min * 6 + 0.1 * sec;
  deg_sec = sec * 6;

  setTime(hand_hr, hand_min, hand_sec, deg_hr, deg_min, deg_sec);
  
  setInterval(() => {
    deg_hr += 0.5/60;
    deg_min += 0.1;
    deg_sec += 6;
    setTime(hand_hr, hand_min, hand_sec, deg_hr, deg_min, deg_sec);
  }, 1000);
};
const setTime = (hand_hr, hand_min, hand_sec, hr, min, sec) => {
  hand_hr.style.setProperty('--deg', hr);
  hand_min.style.setProperty('--deg', min);
  hand_sec.style.setProperty('--deg', sec);
};

export default AnalogClock;
