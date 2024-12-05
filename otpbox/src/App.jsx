import React, { useRef, useState } from "react";

const App = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
 const handleInputChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
 if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("Text").slice(0, 4);
    const newOtp = data.split("");
    setOtp(newOtp);
    newOtp.forEach((val, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = val;
      }
    });
    const nextIndex = Math.min(newOtp.length, inputRefs.current.length - 1);
    inputRefs.current[nextIndex].focus();
  };

  return (
    <div style={{  display:"flex", justifyContent:"center",height:"100vh", alignItems:"center"}}>
      {otp.map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleInputChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          style={{
            width: "50px",
            height: "50px",
            margin: "5px",
            textAlign: "center",
            fontSize: "18px",
          }}
        />
      ))}
    </div>
  );
};

export default App;
