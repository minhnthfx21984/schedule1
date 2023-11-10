import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect, useState } from "react";
import generateRandomSchedule from "./utils/dataGeneration";
import {
  filterObjectsAfter1PM,
  filterObjectsBefore1PM,
} from "./utils/filterData";

function App() {
  const [events, setEvents] = useState([]);

  // Sử dụng useState để theo dõi trạng thái của nút
  const [isToggled, setIsToggled] = useState(false);

  const data = [
    { id: "Minh", color: "#FF0000" },
    { id: "Hieu", color: "#00FF00" },
    { id: "Thang", color: "#00FFFF" },
    { id: "Luan", color: "#C0C0C0" },
    { id: "Linh", color: "#CCFF33" },
    { id: "Vy", color: "#99CCCC" },
  ];

  // Sử dụng hàm để tạo lịch làm việc
  const generatedSchedule = generateRandomSchedule(30, data);
  useEffect(() => {
    setEvents(generatedSchedule.flat());
  }, []);

  // Hàm xử lý sự kiện khi nút được nhấp
  const handleToggle = () => {
    setIsToggled(!isToggled); // Đảo ngược trạng thái
  };

  return (
    <>
      {isToggled ? (
        <Scheduler events={filterObjectsAfter1PM(events)} />
      ) : (
        <Scheduler events={filterObjectsBefore1PM(events)} />
      )}

      <button onClick={handleToggle}>{isToggled ? "Đi làm" : "Nghỉ"}</button>
    </>
  );
}

export default App;
