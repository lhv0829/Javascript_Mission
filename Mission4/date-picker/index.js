import Calendar from "../calendar/Calendar.js";
import { makeDOM } from "../util/makeDOM.js";

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
    style: "display: none;",
  });
  $container.appendChild(calendarDiv);
  Calendar(calendarDiv);

  const modalBackground = makeDOM("div", {
    className: "modal-background",
    style: `height: ${window.innerHeight}px; display: none;`,
  });
  $container.appendChild(modalBackground);

  window.addEventListener("resize", () => {
    modalBackground.style.height = `${window.innerHeight}px`;
  });

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let beforePick;
  $container.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.className === "date-picker-input") {
      calendarDiv.style.display = "";
      modalBackground.style.display = "";
    }
    if (e.target.classList.contains("date")) {
      const monthDiv = $container.getElementsByClassName("month")[0];
      const yearDiv = $container.getElementsByClassName("year")[0];
      const month = monthArray.indexOf(monthDiv.innerHTML);
      const year = parseInt(yearDiv.innerHTML);

      if (e.target.classList.contains("last-month")) {
        if (month === 0)
          datePickerInput.value = `${year - 1}-12-${e.target.innerHTML}`;
        else
          datePickerInput.value = `${year}-${month < 10 ? "0" + month : month
            }-${e.target.innerHTML}`;
      } else if (e.target.classList.contains("next-month")) {
        if (month === 11)
          datePickerInput.value = `${year + 1}-01-${parseInt(e.target.innerHTML) < 10
              ? "0" + e.target.innerHTML
              : e.target.innerHTML
            }`;
        else
          datePickerInput.value = `${year}-${month + 2 < 10 ? "0" + (month + 2) : month + 2
            }-${parseInt(e.target.innerHTML) < 10
              ? "0" + e.target.innerHTML
              : e.target.innerHTML
            }`;
      } else
        datePickerInput.value = `${year}-${month + 1 < 10 ? "0" + (month + 1) : month + 1
          }-${parseInt(e.target.innerHTML) < 10
            ? "0" + e.target.innerHTML
            : e.target.innerHTML
          }`;
      console.log(datePickerInput.value);

      e.target.classList.add("pick");

      calendarDiv.style.display = "none";
      modalBackground.style.display = "none";

      if (beforePick === undefined) {
        beforePick = e.target;
      } else {
        beforePick.classList.remove("pick");
        beforePick = e.target;
      }
    }
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.className === "modal-background") {
      calendarDiv.style.display = "none";
      modalBackground.style.display = "none";
    }
  });
};
const stylesheetLinkDOM = makeDOM("link", {
  href: "date-picker/theme.css",
  rel: "stylesheet",
});
const beforeLinkDOM = document.getElementsByTagName("link")[1];
beforeLinkDOM.after(stylesheetLinkDOM);

export default DatePicker;
