export default function generateRandomSchedule(daysInMonth, employees) {
  const schedule = [];

  // HÀM XÁO TRỘN MẢNG
  function shuffleArray(array) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  // HÀM XÉT PHẦN TỬ XUẤT HIỆN BAO NHIÊU LẦN TRONG MẢNG ĐA CHIỀU
  function countElementInNestedArray(arr, target) {
    let count = 0;

    // Duyệt qua mảng đa chiều
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === target) {
          count++;
        }
      }
    }

    return count;
  }

  // XÉT ĐI LÀM TRONG 4 NGÀY LIÊN TỤC
  function checkContinuousWorkingDays(schedule, scheduleForTheDay, index) {
    const workSchedule = schedule.map((e) => e.slice(0, 4));
    const workScheduleForTheDay = scheduleForTheDay.slice(0, 4);
    let result = false;

    workScheduleForTheDay.forEach((people) => {
      let continuousWorkingDays = 0;

      // Làm liên tục 4 ngày
      if (index >= 4) {
        const previousFourDays = workSchedule.slice(index - 4, index);
        continuousWorkingDays = countElementInNestedArray(
          previousFourDays,
          people,
        );
      }

      if (continuousWorkingDays >= 4) {
        result = true;
      }
    });

    return result;
  }

  // XÉT NGHỈ LÀM TRONG 2 NGÀY LIÊN TỤC
  function checkConsecutiveLeaveDays(schedule, scheduleForTheDay, index) {
    const restSchedule = schedule.map((e) => e.slice(-2));
    const restScheduleForTheDay = scheduleForTheDay.slice(-2);
    let result = false;

    restScheduleForTheDay.forEach((people) => {
      let continuousRestDays = 0;

      // nghỉ liên tục 2 ngày
      if (index >= 2) {
        const previousTowDays = restSchedule.slice(index - 2, index);
        continuousRestDays = countElementInNestedArray(
          previousTowDays,
          people,
        );
      }

      if (continuousRestDays >= 2) {
        result = true;
      }
    });

    return result;
  }

  // TẠO CÁC PHẦN TỬ ĐỦ ĐIỀU KIỆN
  for (let day = 0; day < daysInMonth; day++) {
    const employeesId = employees.map((employ) => employ.id);
    let scheduleForTheDay = shuffleArray(employeesId);

    while (
      checkContinuousWorkingDays(schedule, scheduleForTheDay, day) ||
      checkConsecutiveLeaveDays(schedule, scheduleForTheDay, day)
    ) {
      scheduleForTheDay = shuffleArray(scheduleForTheDay);
    }

    schedule.push(scheduleForTheDay);
  }

  // ==================================================================
  // CẤU TRÚC LẠI DỮ LIỆU VÀ TRẢ KẾT QUẢ

  let date = new Date();
  const convertSchedule = [];

  schedule.forEach((currentDate, i) => {
    date.setHours(9, 0, 0, 0);
    const singleDay = [];

    currentDate.forEach((person, j) => {
      const start = new Date(date);
      const end = new Date(start);
      const dataPerson = employees.find((item) => item.id === person);
      end.setHours(end.getHours() + 1);

      singleDay.push({
        event_id: `${i}_${j}`,
        title: dataPerson.id,
        start: start,
        end: end,
        color: dataPerson.color,
      });

      date = new Date(end);
    });

    date.setDate(date.getDate() + 1);
    convertSchedule.push(singleDay);
  });

  return convertSchedule;
}
