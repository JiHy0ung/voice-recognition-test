import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = () => {
  const { listening, resetTranscript, finalTranscript, transcript } =
    useSpeechRecognition();

  const toggleListening = async () => {
    console.log("버튼 눌림");

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    // 🚨 권한 명시적으로 요청
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      alert("마이크 권한을 허용해주세요: " + err.message);
      return;
    }

    if (listening) {
      console.log("음성 인식 중지");
      SpeechRecognition.stopListening();
    } else {
      console.log("음성 인식 시작");
      resetTranscript();
      SpeechRecognition.startListening({
        language: "ko-KR",
        continuous: true,
        interimResults: true,
      });
    }
  };

  return {
    transcript: finalTranscript || transcript, // ✅ 중간 결과도 포함
    listening,
    toggleListening,
    resetTranscript,
  };
};

export default useSpeechToText;
