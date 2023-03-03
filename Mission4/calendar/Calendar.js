import { makeDOM } from "../util/makeDOM.js";

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

  let calendarSize = getComputedStyle($container).getPropertyValue('--calendar-size');

  window.addEventListener('resize', () => {
    if(matchMedia("screen and (max-width: 767px)").matches){
      calendarSize = window.innerWidth * 0.6;
    }else if(matchMedia("screen and (max-width: 1023px)").matches){
      calendarSize = window.innerWidth * 0.6;
    }else if(matchMedia("screen and (min-width: 1024px)").matches){
      calendarSize = window.innerWidth * 0.6;
    }
    if(calendarSize < 240) calendarSize = 240;
    if(calendarSize > 800) calendarSize = 800;
    $container.style.setProperty('--calendar-size', calendarSize + 'px');
  });

  const TODAY = new Date(); // 오늘
  let currentYear = TODAY.getFullYear(); // 현재 달력에서 보여주는 해
  let currentMonth = TODAY.getMonth(); // 현재 달력에서 보여주는 달
  const today = TODAY.getDate(); // 일
  const thisMonth = TODAY.getMonth(); // 이번달
  const thisYear = TODAY.getFullYear(); // 올해

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
    className: "year-month",
  });
  const rightArrow = makeDOM("i", {
    className: "bx bxs-right-arrow",
  });
  calendarNav.appendChild(leftArrow);
  calendarNav.appendChild(yearMonthInfo);
  calendarNav.appendChild(rightArrow);

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
    const thisMonth_firstDate = new Date(currentYear, currentMonth, 1);
    const thisMonth_firstDay = thisMonth_firstDate.getDay();

    if(parseInt(year.innerHTML) % 4 === 0 && !(parseInt(year.innerHTML) % 100 === 0)) monthDateArray[1] = 29;
    else if(parseInt(year.innerHTML) % 400 === 0) monthDateArray[1] = 29;
    else monthDateArray[1] = 28;
    for (let i = 1; i <= thisMonth_firstDay; i++) { // 이번 달 표시하고 앞에 남는 칸 만큼 저번 달 날짜 채우기
      const date = makeDOM("div", {
        className: "date last-month",
        innerHTML:
          monthDateArray[currentMonth - 1] - thisMonth_firstDay + i,
      });
      if(currentMonth === 0){
        date.innerHTML = monthDateArray[11] - thisMonth_firstDay + i;
      }
      calendarDate.appendChild(date);
    }

    for (let i = 1; i <= monthDateArray[currentMonth]; i++) { // 이번 달 채우기
      const date = makeDOM("div", {
        className: "date",
        innerHTML: i,
      });
      if (monthArray.indexOf(month.innerHTML) === thisMonth && i === today && year.innerHTML === thisYear.toString()){
        date.classList.add('today');
      } 
      if(calendarDate.childNodes.length % 7 === 0) date.classList.add('sun');
      calendarDate.appendChild(date);
    }

    const currentChildNodeLength = calendarDate.childNodes.length;

    for (let i = 1; i <= 42 - currentChildNodeLength; i++) { // 이번 달 채우고 남는 칸 다음 달 날짜 채우기
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

  const setCalendar = (yearMonthInfo,calendarDate , month, year) => {
    yearMonthInfo.replaceChildren();
    calendarDate.replaceChildren();
    setYearMonth(yearMonthInfo, month, year);
    setCalendarDate(calendarDate, month);
  };

  setCalendar(yearMonthInfo, calendarDate, currentMonth, currentYear);

  $container.addEventListener('click', e => {
    if(e.target === leftArrow){
      currentMonth--;
      if(currentMonth < 0){
        currentYear -= 1;
        currentMonth = 11;
      }
      setCalendar(yearMonthInfo, calendarDate, currentMonth, currentYear);
    }
    if(e.target === rightArrow){
      currentMonth++;
      if(currentMonth > 11){
        currentYear += 1;
        currentMonth = 0;
      } 
      setCalendar(yearMonthInfo, calendarDate, currentMonth, currentYear);
    }
  });

  // leftArrow.addEventListener('click', () => {
  //   currentMonth--;
  //   if(currentMonth < 0){
  //     currentYear -= 1;
  //     currentMonth = 11;
  //   }
  //   setCalendar(yearMonthInfo, calendarDate, currentMonth, currentYear);
  // });

  // rightArrow.addEventListener('click', () => {
  //   currentMonth++;
  //   if(currentMonth > 11){
  //     currentYear += 1;
  //     currentMonth = 0;
  //   } 
  //   setCalendar(yearMonthInfo, calendarDate, currentMonth, currentYear);
  // });
};
const stylesheetLinkDOM = makeDOM("link", {
  href: "calendar/calendarTheme.css",
  rel: "stylesheet",
});
const beforeLinkDOM = document.getElementsByTagName("link")[1];
beforeLinkDOM.after(stylesheetLinkDOM);

export default Calendar;