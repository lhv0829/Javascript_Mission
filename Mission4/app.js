import DatePicker from "./date-picker/index.js";

const $containers = [...document.querySelectorAll('.date-picker')];

$containers.forEach(($container) => {
  DatePicker($container);
});