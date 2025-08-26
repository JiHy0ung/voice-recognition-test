import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = () => {
  const { listening, resetTranscript, finalTranscript } =
    useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      // 새로운 음성인식을 시작하기 전에 transcript 리셋
      resetTranscript();
      SpeechRecognition.startListening({
        language: "ko-KR",
        continuous: true,
      });
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      language: "ko-KR",
      continuous: true,
      interimResults: true,
    });
  };

  return {
    transcript: finalTranscript, // 최종 확정된 텍스트만 반환
    listening,
    toggleListening,
    stopListening,
    startListening,
    resetTranscript,
  };
};

export default useSpeechToText;
