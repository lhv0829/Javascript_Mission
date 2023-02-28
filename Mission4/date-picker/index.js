const makeDOM = (domType, propertyMap) => {
  // domType : div, a, li...
  // propertyMap : {"className" : "product-card", "alt" : ...}
  // Object.keys(propertyMap) -> ["className", "alt"]
  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => {
    if (key.startsWith("data-")) {
      const dataKey = key.slice(5);
      dom.dataset[dataKey] = propertyMap[key];
    } else dom[key] = propertyMap[key];
  });
  return dom;
};
const DatePicker = ($container) => {
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
  const dayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const datePickerInput = makeDOM("input", {
    className: "date-picker-input",
    type: "text",
    value: "Select date",
    disabled: "true",
  });
  $container.appendChild(datePickerInput);

  const calendarDiv = makeDOM("div", {
    className: "calendar",
  });
  $container.appendChild(calendarDiv);

  const today = new Date();

  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const todayYear = today.getFullYear();
  // const todayDay = today.getDay();
  // console.log(todayDay);
  const monthFirstDate = new Date(todayYear, todayMonth, 1);
  console.log(monthFirstDate);
  const monthFirstDay = monthFirstDate.getDay();
  const monthFirstDayMonth = monthFirstDate.getMonth();

  // calendar-nav
  const calendarNav = makeDOM("div", {
    className: "calendar-nav",
  });
  calendarDiv.appendChild(calendarNav);
  const setYearMonth = (yearMonthInfo, todayMonth, todayYear) => {
    const month = makeDOM("div", {
      className: "month",
      innerHTML: monthArray[todayMonth],
    });
    const year = makeDOM("div", {
      className: "year",
      innerHTML: todayYear,
    });
    yearMonthInfo.appendChild(month);
    yearMonthInfo.appendChild(year);
  };
  const leftArrow = makeDOM("i", {
    className: "bx bxs-left-arrow",
  });
  const yearMonthInfo = makeDOM("div", {
    className: "year-month-info",
  });
  const rightArrow = makeDOM("i", {
    className: "bx bxs-right-arrow",
  });
  calendarNav.appendChild(leftArrow);
  calendarNav.appendChild(yearMonthInfo);
  calendarNav.appendChild(rightArrow);
  setYearMonth(yearMonthInfo, todayMonth, todayYear);

  // calendar-nav end

  // calendar-grid
  const calendarGrid = makeDOM("div", {
    className: "calendar-grid",
  });
  calendarDiv.appendChild(calendarGrid);

  const calendarDay = makeDOM("div", {
    className: "calendar-day",
  });
  calendarGrid.appendChild(calendarDay);

  for (let i = 0; i < dayArray.length; i++) {
    const day = makeDOM("div", {
      className: "day",
      innerHTML: dayArray[i],
      "data-day": dayArray[i],
    });
    calendarDay.appendChild(day);
  }

  const calendarDate = makeDOM("div", {
    className: "calendar-date",
  });
  calendarGrid.appendChild(calendarDate);

  const monthDateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const setCalendarDate = (calendarDate, todayMonth) => {
    const month = document.getElementsByClassName("month")[0];
    const monthFirstDate = new Date(todayYear, todayMonth, 1);
    // console.log(monthFirstDate);
    const monthFirstDay = monthFirstDate.getDay();
    const monthFirstDayMonth = monthFirstDate.getMonth();
    // console.log(month);
    for (let i = 0; i < monthFirstDay; i++) {
      const date = makeDOM("div", {
        className: "date last-month",
        innerHTML:
          monthDateArray[monthFirstDayMonth - 1] - monthFirstDay + 1 + i,
        "data-date":
          monthDateArray[monthFirstDayMonth - 1] - monthFirstDay + 1 + i,
      });
      calendarDate.appendChild(date);
    }

    for (let i = 0; i < monthDateArray[todayMonth]; i++) {
      const date = makeDOM("div", {
        className: "date",
        innerHTML: i + 1,
        "data-date": i + 1,
      });
      if (
        monthArray.indexOf(month.innerHTML) === todayMonth &&
        i + 1 === todayDate
      )
        date.classList.add("today");
      calendarDate.appendChild(date);
    }
    console.log(calendarDate.childNodes.length);
    const currentChildNodeLength = calendarDate.childNodes.length;

    for (let i = 0; i < 42 - currentChildNodeLength; i++) {
      const date = makeDOM("div", {
        className: "date next-month",
        innerHTML: i + 1,
        "data-date": i + 1,
      });
      calendarDate.appendChild(date);
    }
  };
  setCalendarDate(calendarDate, todayMonth, monthFirstDay);
  let count = 0;
  leftArrow.addEventListener('click', () => {
    count++;
    let beforeMonth = todayMonth - count;
    calendarDate.replaceChildren();
    setCalendarDate(calendarDate, beforeMonth);
    yearMonthInfo.replaceChildren();
    setYearMonth(yearMonthInfo, beforeMonth, todayYear);
  });
  count = 0;
  rightArrow.addEventListener('click', () => {
    count++;
    let beforeMonth = todayMonth + count;
    calendarDate.replaceChildren();
    setCalendarDate(calendarDate, beforeMonth);
    yearMonthInfo.replaceChildren();
    setYearMonth(yearMonthInfo, beforeMonth, todayYear);
  });
};
const linkDOM = makeDOM("link", {
  href: "date-picker/theme.css",
  rel: "stylesheet",
});
const beforeLink = document.getElementsByTagName("link")[1];
console.log(linkDOM);
beforeLink.after(linkDOM);

export default DatePicker;
