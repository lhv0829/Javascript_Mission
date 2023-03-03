export const makeDOM = (domType, propertyMap) => {
  // domType : div, a, li...
  // propertyMap : {"className" : "product-card", "alt" : ...}
  // Object.keys(propertyMap) -> ["className", "alt"]
  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => { 
    dom[key] = propertyMap[key];
  });
  return dom;
};