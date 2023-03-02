const makeDOM = (domType, propertyMap) => {
  // domType : div, a, li...
  // propertyMap : {"className" : "product-card", "alt" : ...}
  // Object.keys(propertyMap) -> ["className", "alt"]
  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => {
    // if (key.startsWith("data-")) {
    //   const dataKey = key.slice(5);
    //   dom.dataset[dataKey] = propertyMap[key];
    // } else 
    dom[key] = propertyMap[key];
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
    readOnly: "true",
  });

  $container.appendChild(datePickerInput);

  const calendarDiv = makeDOM("div", {
    className: "calendar",
    style: 'display: none;',
  });
  $container.appendChild(calendarDiv);
  const calendarBackground = makeDOM('div', {
    className: 'calendar-background',
    style: `height: ${window.innerHeight}px; display: none;`,
  });
  $container.after(calendarBackground);
  console.log(`window.innerHeight : ${window.innerHeight}`);

  let calendarDivWidth = getComputedStyle(calendarDiv).getPropertyValue('--calendar-size');
  let temp_size = window.innerWidth;
  window.addEventListener('resize', () => {
    if(matchMedia("screen and (max-width: 767px)").matches){
      console.log("mobile");
      calendarDivWidth = window.innerWidth * 0.6;
    }else if(matchMedia("screen and (max-width: 1023px)").matches){
      console.log("tablet");
      calendarDivWidth = window.innerWidth * 0.6;
    }else if(matchMedia("screen and (min-width: 1024px)").matches){
      console.log("desktop");
      calendarDivWidth = window.innerWidth * 0.6;
    }
    if(calendarDivWidth < 240) calendarDivWidth = 240;
    if(calendarDivWidth > 800) calendarDivWidth = 800;
    console.log(`달력 크기 : ${calendarDivWidth} & 브라우저 크기 : ${temp_size}`);
    calendarDiv.style.setProperty('--calendar-size', calendarDivWidth + 'px');
    calendarBackground.style.height = `${window.innerHeight}px`;
  });

  const today = new Date();

  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  // const currentDate = today.getDate();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  // const todayDay = today.getDay();
  // console.log(todayDay);
  const monthFirstDate = new Date(currentYear, currentMonth, 1);
  console.log(monthFirstDate);
  // const monthFirstDay = monthFirstDate.getDay();

  // calendar-nav
  const calendarNav = makeDOM("div", {
    className: "calendar-nav",
  });
  calendarDiv.appendChild(calendarNav);
  const setYearMonth = (yearMonthInfo, currentMonth, currentYear) => {
    const month = makeDOM("div", {
      className: "month",
      innerHTML: monthArray[currentMonth],
    });
    const year = makeDOM("div", {
      className: "year",
      innerHTML: currentYear,
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
  // setYearMonth(yearMonthInfo, currentMonth, currentYear);

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
      // "data-day": dayArray[i],
    });
    calendarDay.appendChild(day);
  }

  const calendarDate = makeDOM("div", {
    className: "calendar-date",
  });
  calendarGrid.appendChild(calendarDate);

  let monthDateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const setCalendarDate = (calendarDate, currentMonth) => {
    const month = document.getElementsByClassName("month")[0];
    console.log(month);
    const year = document.getElementsByClassName('year')[0];
    const monthFirstDate = new Date(currentYear, currentMonth, 1);
    // console.log(monthFirstDate);
    const monthFirstDay = monthFirstDate.getDay();
    // const monthFirstDayMonth = monthFirstDate.getMonth();
    // console.log(month);
    if(parseInt(year.innerHTML) % 4 === 0 && !(parseInt(year.innerHTML) % 100 === 0)) monthDateArray[1] = 29;
    else if(parseInt(year.innerHTML) % 400 === 0) monthDateArray[1] = 29;
    else monthDateArray[1] = 28;
    for (let i = 1; i <= monthFirstDay; i++) {
      const date = makeDOM("div", {
        className: "date last-month",
        innerHTML:
          monthDateArray[currentMonth - 1] - monthFirstDay + i,
        // "data-date":
        //   monthDateArray[currentMonth - 1] - monthFirstDay + i,
      });
      if(currentMonth === 0){
        date.innerHTML = monthDateArray[11] - monthFirstDay + i;
        // date.dataset.date = monthDateArray[11] - monthFirstDay + i;
      }
      calendarDate.appendChild(date);
    }

    for (let i = 1; i <= monthDateArray[currentMonth]; i++) {
      const date = makeDOM("div", {
        className: "date",
        innerHTML: i,
        // "data-date": i,
      });
      if (monthArray.indexOf(month.innerHTML) === todayMonth && i === todayDate && year.innerHTML === todayYear.toString()) date.classList.add('today');
      if(calendarDate.childNodes.length % 7 === 0) date.classList.add('sun');
      calendarDate.appendChild(date);
    }
    const currentChildNodeLength = calendarDate.childNodes.length;
    console.log(currentChildNodeLength);

    for (let i = 1; i <= 42 - currentChildNodeLength; i++) {
      const date = makeDOM("div", {
        className: "date next-month",
        innerHTML: i,
        // "data-date": i,
      });
      calendarDate.appendChild(date);
    }
    $container.addEventListener('mouseover', e => {
      if(e.target.classList.contains('date')) e.target.classList.add('hover');
    });
    $container.addEventListener('mouseout', e => {
      if(e.target.classList.contains('date')) e.target.classList.remove('hover');
    });
  };
  // setCalendarDate(calendarDate, currentMonth);
  const setCalendarAll = (yearMonthInfo,calendarDate , month, year) => {
    yearMonthInfo.replaceChildren();
    calendarDate.replaceChildren();
    setYearMonth(yearMonthInfo, month, year);
    setCalendarDate(calendarDate, month);
    calendarDate.childNodes.forEach((item) => item.addEventListener('click', e => {
      if(e.target.classList.contains('last-month')){
        if(month === 0) datePickerInput.value = `${year - 1}-12-${e.target.innerHTML}`;
        else datePickerInput.value = `${year}-${month < 10 ? '0' + month : month}-${e.target.innerHTML}`;
      }
      else if(e.target.classList.contains('next-month')){
        if(month === 11) datePickerInput.value = `${year + 1}-01-${parseInt(e.target.innerHTML) < 10 ? '0' + e.target.innerHTML : e.target.innerHTML}`;
        else datePickerInput.value = `${year}-${month + 2 < 10 ? '0' + (month + 2) : month + 2}-${parseInt(e.target.innerHTML) < 10 ? '0' + e.target.innerHTML : e.target.innerHTML}`;
      }
      else datePickerInput.value = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${parseInt(e.target.innerHTML) < 10 ? '0' + e.target.innerHTML : e.target.innerHTML}`;
      calendarDiv.style.display = 'none';
      calendarBackground.style.display = 'none';
    }));
  };
  setCalendarAll(yearMonthInfo, calendarDate, currentMonth, currentYear);
  // event
  datePickerInput.addEventListener('click', () => {
    calendarDiv.style.display = '';
    calendarBackground.style.display = '';
  });

  leftArrow.addEventListener('click', () => {
    currentMonth--;
    if(currentMonth < 0){
      currentYear -= 1;
      currentMonth = 11;
    }
    setCalendarAll(yearMonthInfo, calendarDate, currentMonth, currentYear);
  });

  rightArrow.addEventListener('click', () => {
    currentMonth++;
    if(currentMonth > 11){
      currentYear += 1;
      currentMonth = 0;
    } 
    setCalendarAll(yearMonthInfo, calendarDate, currentMonth, currentYear);
  });
  document.body.addEventListener('click', e => {
    if(e.target.className === 'calendar-background'){
      calendarDiv.style.display = 'none';
      calendarBackground.style.display = 'none';
    }
    console.log(e.target);
  })

};
const linkDOM = makeDOM("link", {
  href: "date-picker/theme.css",
  rel: "stylesheet",
});
const beforeLink = document.getElementsByTagName("link")[1];
console.log(linkDOM);
beforeLink.after(linkDOM);

export default DatePicker;
