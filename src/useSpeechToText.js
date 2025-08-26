import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = () => {
  const { listening, resetTranscript, finalTranscript } =
    useSpeechRecognition();

  const toggleListening = async () => {
    // 브라우저 지원 확인
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    // HTTPS 확인
    if (location.protocol !== "https:" && location.hostname !== "localhost") {
      alert("음성 인식은 HTTPS 환경에서만 사용할 수 있습니다.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      try {
        // 마이크 권한 명시적 요청
        await navigator.mediaDevices.getUserMedia({ audio: true });

        resetTranscript();
        SpeechRecognition.startListening({
          language: "ko-KR",
          continuous: true,
          interimResults: true,
        });
      } catch (error) {
        console.error("마이크 권한 오류:", error);
        if (error.name === "NotAllowedError") {
          alert(
            "마이크 권한이 필요합니다. 브라우저 설정에서 마이크 권한을 허용해주세요."
          );
        } else if (error.name === "NotFoundError") {
          alert("마이크를 찾을 수 없습니다.");
        } else {
          alert("음성 인식을 시작할 수 없습니다: " + error.message);
        }
      }
    }
  };

  return {
    transcript: finalTranscript,
    listening,
    toggleListening,
    resetTranscript,
  };
};

export default useSpeechToText;
