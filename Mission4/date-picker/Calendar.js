import { makeDOM } from "./makeDOM.js";

const Calendar = ($container) => {
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
  const calendarBackground = makeDOM('div', {
    className: 'calendar-background',
    style: `height: ${window.innerHeight}px; display: none;`,
  });
  $container.after(calendarBackground);

  let calendarDivWidth = getComputedStyle($container).getPropertyValue('--calendar-size');

  window.addEventListener('resize', () => {
    if(matchMedia("screen and (max-width: 767px)").matches){
      calendarDivWidth = window.innerWidth * 0.6;
      // console.log(calendarDivWidth);
      // console.log(window.innerWidth);
    }else if(matchMedia("screen and (max-width: 1023px)").matches){
      calendarDivWidth = window.innerWidth * 0.6;
    }else if(matchMedia("screen and (min-width: 1024px)").matches){
      calendarDivWidth = window.innerWidth * 0.6;
    }
    if(calendarDivWidth < 240) calendarDivWidth = 240;
    if(calendarDivWidth > 800) calendarDivWidth = 800;
    $container.style.setProperty('--calendar-size', calendarDivWidth + 'px');
    calendarBackground.style.height = `${window.innerHeight}px`;
  });

  const today = new Date();

  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // calendar-nav
  const calendarNav = makeDOM("div", {
    className: "calendar-nav",
  });
  $container.appendChild(calendarNav);
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

  // calendar-nav end

  // calendar-grid
  const calendarGrid = makeDOM("div", {
    className: "calendar-grid",
  });
  $container.appendChild(calendarGrid);

  const calendarDay = makeDOM("div", {
    className: "calendar-day",
  });
  calendarGrid.appendChild(calendarDay);

  for (let i = 0; i < dayArray.length; i++) {
    const day = makeDOM("div", {
      className: "day",
      innerHTML: dayArray[i],
    });
    calendarDay.appendChild(day);
  }

  const calendarDate = makeDOM("div", {
    className: "calendar-date",
  });
  calendarGrid.appendChild(calendarDate);

  let monthDateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const setCalendarDate = (calendarDate, currentMonth) => {
    const month = $container.getElementsByClassName("month")[0];
    const year = $container.getElementsByClassName('year')[0];
    const monthFirstDate = new Date(currentYear, currentMonth, 1);
    const monthFirstDay = monthFirstDate.getDay();

    if(parseInt(year.innerHTML) % 4 === 0 && !(parseInt(year.innerHTML) % 100 === 0)) monthDateArray[1] = 29;
    else if(parseInt(year.innerHTML) % 400 === 0) monthDateArray[1] = 29;
    else monthDateArray[1] = 28;
    for (let i = 1; i <= monthFirstDay; i++) {
      const date = makeDOM("div", {
        className: "date last-month",
        innerHTML:
          monthDateArray[currentMonth - 1] - monthFirstDay + i,
      });
      if(currentMonth === 0){
        date.innerHTML = monthDateArray[11] - monthFirstDay + i;
      }
      calendarDate.appendChild(date);
    }

    for (let i = 1; i <= monthDateArray[currentMonth]; i++) {
      const date = makeDOM("div", {
        className: "date",
        innerHTML: i,
      });
      if (monthArray.indexOf(month.innerHTML) === todayMonth && i === todayDate && year.innerHTML === todayYear.toString()){
        date.classList.add('today');
      } 
      if(calendarDate.childNodes.length % 7 === 0) date.classList.add('sun');
      calendarDate.appendChild(date);
    }
    const currentChildNodeLength = calendarDate.childNodes.length;

    for (let i = 1; i <= 42 - currentChildNodeLength; i++) {
      const date = makeDOM("div", {
        className: "date next-month",
        innerHTML: i,
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

  const setCalendarAll = (yearMonthInfo,calendarDate , month, year) => {
    yearMonthInfo.replaceChildren();
    calendarDate.replaceChildren();
    setYearMonth(yearMonthInfo, month, year);
    setCalendarDate(calendarDate, month);
    let beforePick;
    calendarDate.childNodes.forEach((item) => item.addEventListener('click', e => {
      // console.log(beforePick);
      if(e.target.classList.contains('last-month')){
        if(month === 0) datePickerInput.value = `${year - 1}-12-${e.target.innerHTML}`;
        else datePickerInput.value = `${year}-${month < 10 ? '0' + month : month}-${e.target.innerHTML}`;
      }
      else if(e.target.classList.contains('next-month')){
        if(month === 11) datePickerInput.value = `${year + 1}-01-${parseInt(e.target.innerHTML) < 10 ? '0' + e.target.innerHTML : e.target.innerHTML}`;
        else datePickerInput.value = `${year}-${month + 2 < 10 ? '0' + (month + 2) : month + 2}-${parseInt(e.target.innerHTML) < 10 ? '0' + e.target.innerHTML : e.target.innerHTML}`;
      }
      else datePickerInput.value = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${parseInt(e.target.innerHTML) < 10 ? '0' + e.target.innerHTML : e.target.innerHTML}`;
      e.target.classList.add('pick');
      console.log(datePickerInput.value);
      $container.style.display = 'none';
      calendarBackground.style.display = 'none';
      if(beforePick === undefined){
        beforePick = e.target;
        // console.log(`처음 아무 것도 선택 안했을 때` + beforePick);
        // console.log(beforePick);
      }
      else{
        // console.log(`그 전에 선택된 날짜가 있을 때 선택된 날짜 ${beforePick}`);
        // console.log(beforePick);
        beforePick.classList.remove('pick');
        // console.log(`그 전에 선택된 날짜에서 pick이 지워졌는지 확인 ${beforePick}`);
        // console.log(beforePick);
        beforePick = e.target;
        // console.log(`새롭게 선택된 날짜가 beforePick에 들어갔는지 확인` + beforePick);
        // console.log(beforePick);
      }
    }));
  };
  setCalendarAll(yearMonthInfo, calendarDate, currentMonth, currentYear);
  // event
  datePickerInput.addEventListener('click', () => {
    $container.style.display = '';
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
};

export default Calendar;