
import "./main.css";
import { getDaysInMonth, getWeekDays } from "./dates";
import { languageCodes } from "./languages";

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let currentLanguage = 'pt-BR';

function renderMonthAndYear() {
  const monthAndYear = document.querySelector('#monthAndYear');

  monthAndYear!.innerHTML = "";

  const date = new Date(currentYear, currentMonth, 1);

  const monthName = new Intl.DateTimeFormat(currentLanguage, { month: "long" }).format(date);

  const year = new Intl.DateTimeFormat(currentLanguage, { year: "numeric" }).format(date)

  const h1 = document.createElement('h1');
  const span = document.createElement('span');

  span.className = "ml-1 font-bold text-green-300";
  span.innerText = year;

  h1.innerText = monthName;

  h1.appendChild(span);
  monthAndYear?.appendChild(h1)
}


function renderWeekdays() {
  const weekDaysUl = document.getElementById("weekDays");
  weekDaysUl!.innerHTML = "";

  getWeekDays(currentLanguage).forEach((day) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-center w-10 h-10 font-bold rounded-full cursor-pointer";

    li.innerText = day;
    weekDaysUl?.appendChild(li);
  });
}


function renderDays() {
  const days = getDaysInMonth(currentMonth, currentYear);

  const daysUl = document.getElementById("daysInMonth");
  daysUl!.innerHTML = "";

  days.forEach((day) => {
    const li = document.createElement("li");
    li.innerText = day ? day.getDate().toString() : "";
    li.className =
      "flex items-center justify-center w-8 h-8 p-2 cursor-pointer rounded-xl";

    if (day && day.getDate() === new Date().getDate() &&
      day.getMonth() === new Date().getMonth() &&
      day.getFullYear() === new Date().getFullYear()
    ) {
     li.className += 'bg-green-500 text-green-300 font-bold' 
    }

    daysUl?.appendChild(li);
  });
}

function renderSelect() {
  const select = document.querySelector('#language') as HTMLSelectElement

  const currentValue = select.value || 'pt-BR';
  select.innerHTML = " ";

  const languageDisplay = new Intl.DisplayNames([currentLanguage], {
    type: 'language',
  });

  languageCodes.forEach((language) => {
    const option = document.createElement('option');
    option.value = language;

    option.textContent = languageDisplay.of(language) || " ";
    select.appendChild(option)
  });

  select.value = currentValue
}

function changeMonth(direction: "next" | "prev") {
  if (direction === "next") {
    currentMonth += 1;

    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
  }

  if (direction === "prev") {
    currentMonth -= 1;

    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
  }

  renderMonthAndYear();
  renderDays();
}

function handleLanguageChange(event:Event) {
  currentLanguage = (event.target as HTMLSelectElement).value;

  renderMonthAndYear();
  renderWeekdays();
  renderSelect();

}

window.onload = () => {
  renderMonthAndYear()
  renderWeekdays()
  renderDays()
  renderSelect()

  const nextMonthButton = document.querySelector('#nextMonth')
  const prevMonthButton = document.querySelector('#prevMonth')
  const languageSelect = document.querySelector('#language')

  nextMonthButton?.addEventListener('click', () => changeMonth('next'));
  prevMonthButton?.addEventListener('click', () => changeMonth('prev'));
  languageSelect?.addEventListener('change', handleLanguageChange);


}