//날짜와 Api 호출에 필요한 parameter 받아오는 function
function getDate() {
  const today = new Date();
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayOfWeek = week[today.getDay()];
  const hour = today.getHours();
  let dayDivForApi;
  let dayDiv;

  if (hour <= 7 && hour >= 0) {
    dayDiv = "아침";
    dayDivForApi = "breakfast";
  } else if (hour >= 8 && hour <= 12) {
    dayDiv = "점심";
    dayDivForApi = "lunch";
  } else if (hour >= 13 && hour <= 19) {
    dayDiv = "저녁";
    dayDivForApi = "dinner";
  } else if (hour >= 20 && hour <= 23) {
    dayDiv = "아침";
    dayDivForApi = "breakfast";
    today.setDate(today.getDate() + 1);
  }

  const formatedDate = `${today.getMonth() + 1}.${today.getDate()}(${
    week[today.getDay()]
  })`;

  const formatedDateForApi = `${today
    .getFullYear()
    .toString()
    .slice(-2)}${String(today.getMonth() + 1).padStart(2, "0")}${String(
    today.getDate()
  ).padStart(2, "0")}`;

  return {
    date: formatedDate,
    dayDiv: dayDiv,
    dateForApi: formatedDateForApi,
    dayDivForApi: dayDivForApi,
    hour: hour,
  };
}

export default getDate;
