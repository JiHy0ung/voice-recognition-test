import "./App.css";
import { useState, useEffect } from "react";
import useSpeechToText from "./useSpeechToText";

function App() {
  const { transcript, listening, toggleListening } = useSpeechToText();
  const [inputValue, setInputValue] = useState("");

  // transcript가 변경될 때마다 inputValue에 추가
  useEffect(() => {
    if (transcript) {
      setInputValue((prev) => prev + transcript);
    }
  }, [transcript]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  // 페이지 로드 시 환경 체크
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Protocol:", window.location.protocol);
      console.log(
        "Speech Recognition Support:",
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window
      );
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
      }}
    >
      <h1>Speech To Text Test</h1>
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="음성인식 결과가 여기에 추가됩니다. 직접 수정도 가능합니다."
        style={{ height: "100px", padding: "10px", fontSize: "16px" }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={toggleListening}>
          {listening ? "음성 인식 중지" : "음성 인식 시작"}
        </button>

        <button onClick={clearInput}>입력 내용 지우기</button>
      </div>
      {listening && <p style={{ color: "red" }}>🎤 음성 인식 중...</p>}

      {/* 디버깅 정보 표시 */}
      <div style={{ fontSize: "12px", color: "gray", marginTop: "20px" }}>
        <p>
          Protocol:{" "}
          {typeof window !== "undefined" ? window.location.protocol : "N/A"}
        </p>
        <p>
          Speech Recognition:{" "}
          {typeof window !== "undefined" &&
          ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
            ? "지원됨"
            : "미지원"}
        </p>
      </div>
    </div>
  );
}

export default App;
