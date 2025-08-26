import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = () => {
  const { listening, resetTranscript, finalTranscript } =
    useSpeechRecognition();

  const toggleListening = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
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
