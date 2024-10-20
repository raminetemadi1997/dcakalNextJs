import React, { useState, useEffect, useContext } from "react";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import { LoginContext } from "@/context/LoginContext";
import axios from "@/lib/axios";

const VarifyCountDown = ({ initialSeconds, className }) => {

  const {setToken , phone,  setPhone} = useContext(LoginContext)

  const [seconds, setSeconds] = useState(initialSeconds);


  function repeatHandler(params) {
    setSeconds(250)
    axios.get("/sanctum/csrf-cookie");
    axios.post('api/login' , {
      login_value:phone,
    }).then((response)=>{
      setPhone(phone);
      setToken(response.data.data.token);
      // router.push('/verify-login')
    })
  }



  useEffect(() => {
    // Exit early if countdown is finished
    if (seconds <= 0) {
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds]);

  // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };


  


  return (
    <div className={`w-full text-center ${className}`}>
      {seconds != 0 ? (
        <p className="text-sm">
          <span className="font-bold">{formatTime(seconds)}</span> مانده تا
          دریافت مجدد
        </p>
      ) : (
        <ButtonCustom
          justifyContent="center"
          variant="text"
          text="دریافت مجدد"
          onClick={repeatHandler}
          type="button"
        />
      )}
    </div>
  );
};

export default VarifyCountDown;
