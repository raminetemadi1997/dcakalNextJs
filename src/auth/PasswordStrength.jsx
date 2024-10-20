import React from "react";

const PasswordStrength = ({ strength }) => {
  return (
    <div className="mb-5">
      <div className={`w-full h-2 bg-slate-100 mb-1 rounded-lg`}>
        <div
          className={`h-full ${
            strength === "veryWeack"
              ? "w-1/5  bg-red-500"
              : strength === "weack"
              ? "w-2/5 bg-red-300"
              : strength === "medium"
              ? "w-3/5 bg-yellow-500"
              : strength === "good"
              ? "w-4/5 bg-green-300"
              : strength === "veryGood"
              ? "w-5/5 bg-green-500"
              : "w-0"
          } duration-150 ease-in-out`}
        ></div>
      </div>
      <p className="text-xs mx-4">
        درجه سختی:{" "}
        {strength === "veryWeack"
          ? "خیلی ضعیف"
          : strength === "weack"
          ? "ضعیف"
          : strength === "medium"
          ? "متوسط"
          : strength === "good"
          ? "خوب"
          : strength === "veryGood"
          ? "خیلی خوب"
          : " "}
      </p>
    </div>
  );
};

export default PasswordStrength;
