import Calendar from "./Calendar.js";
import { makeDOM } from "./makeDOM.js";

const DatePicker = ($container) => {
  const datePickerInput = makeDOM("input", {
    className: "date-picker-input",
    type: "text",
    value: "Select date",
    readOnly: "true",
  });

  $container.appendChild(datePickerInput);

  const calendarDiv = makeDOM("div", {
    className: "calendar",
    style: 'display: none;',
  });
  $container.appendChild(calendarDiv);
  Calendar(calendarDiv, datePickerInput);

  const calendarBackground = $container.getElementsByClassName('calendar-background')[0];
  
  document.body.addEventListener('click', e => {
    if(e.target.className === 'calendar-background'){
      calendarDiv.style.display = 'none';
      calendarBackground.style.display = 'none';
    }
  })

};
const linkDOM = makeDOM("link", {
  href: "date-picker/theme.css",
  rel: "stylesheet",
});
const beforeLink = document.getElementsByTagName("link")[1];
beforeLink.after(linkDOM);

export default DatePicker;
