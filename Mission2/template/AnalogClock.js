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

};

export default AnalogClock;
