import React, { useEffect, useState } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const TimerCustom = ({ endDate, startDate, icon = true }) => {
  // const [minutes, setMinutes] = useState(null)
  // const [second, setSecond] = useState(null)
  // const [hours, setHours] = useState(null)
  // const [days, setDays] = useState(null)

  // timer function
  // useEffect(() => {
  //     setInterval(function () {
  //         let currentTime = new Date(endDate) - new Date();
  //         setDays(Math.floor(currentTime / (1000 * 60 * 60 * 24)))
  //         // 12 AM format timer
  //         let toDate = new Date();
  //         let tomorrow = new Date();
  //         tomorrow.setHours(24, 0, 0, 0);
  //         let diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
  //         let diffHr = Math.floor(diffMS / 3600);
  //         diffMS = diffMS - diffHr * 3600;
  //         let diffMi = Math.floor(diffMS / 60);
  //         diffMS = diffMS - diffMi * 60;
  //         let diffS = Math.floor(diffMS);
  //         let result = ((diffHr < 10) ? "0" + diffHr : diffHr);
  //         result += ":" + ((diffMi < 10) ? "0" + diffMi : diffMi);
  //         result += ":" + ((diffS < 10) ? "0" + diffS : diffS);
  //         setMinutes((diffMi < 10) ? "0" + diffMi : diffMi);
  //         setHours((diffHr < 10) ? "0" + diffHr : diffHr)
  //         setSecond((diffS < 10) ? "0" + diffS : diffS)
  //         // 12 AM format timer
  //     }, 1000);

  // }, [endDate, minutes, days])



  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  useEffect(() => {
    let dayHours = parseInt((new Date(endDate) - new Date()) / 3600000);
    var toDate = new Date();
    var tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    var diffMS = parseInt(tomorrow.getTime() / 1000 - toDate.getTime() / 1000);
    var diffHr = Math.floor(diffMS / 3600);

    if (diffHr < dayHours) {
      const interval = setInterval(() => {
        var toDate = new Date();
        var tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        var diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
        var diffHr = Math.floor(diffMS / 3600);
        diffMS = diffMS - diffHr * 3600;
        var diffMi = Math.floor(diffMS / 60);
        diffMS = diffMS - diffMi * 60;
        var diffS = Math.floor(diffMS);
        setHours(diffHr);
        setMinutes(parseInt(diffMi));
        setSeconds(diffS);
      }, 1000);
    } else {
      const target = new Date(endDate);

      const interval = setInterval(() => {
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));

        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        const s = Math.floor((difference % (1000 * 60)) / 1000);

        if (d >= 0 && h >= 0 && m >= 0 && s >= 0) {
          setDays(d);
          setHours(h);
          setMinutes(m);
          setSeconds(s);
        }
      }, 1000);
    }
  }, [endDate]);

  // timer function
  return (
    <>
      {days >= 0 && (
        <div className="flex items-center justify-end">
          <div className="tracking-widest text-[#DE1616] text-sm font-bold">
            {hours}:{minutes}:{seconds}
          </div>
          {icon && (
            <WatchLaterIcon
              sx={{ color: "#DE1616", ml: 0.5 }}
              fontSize="medium"
            />
          )}
        </div>
      )}
    </>
  );
};

export default TimerCustom;
