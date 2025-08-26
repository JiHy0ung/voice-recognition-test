import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = () => {
  const { listening, resetTranscript, finalTranscript } =
    useSpeechRecognition();

  const toggleListening = () => {
    console.log("버튼 눌림");

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
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
    transcript: finalTranscript,
    listening,
    toggleListening,
    resetTranscript,
  };
};

export default useSpeechToText;
