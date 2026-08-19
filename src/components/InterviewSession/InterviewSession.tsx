import { useEffect, useRef, useState } from "react";

import {
  CheckCircleOutlined,
  LightbulbOutlined,
  Mic,
  PsychologyOutlined,
  Send,
  Stop,
  WarningAmberOutlined,
} from "@mui/icons-material";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import "./InterviewSession.scss";
import type {
  InterviewEvaluationResponse,
  InterviewPrep,
} from "../../features/ai/types";
import {
  useEvaluateInterviewAnswerMutation,
  useTranscribeInterviewAudioMutation,
} from "../../features/ai/aiApi";

interface InterviewSessionProps {
  jobId: string;
  prep: InterviewPrep;
}

const InterviewSession = ({ jobId, prep }: InterviewSessionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [evaluation, setEvaluation] =
    useState<InterviewEvaluationResponse | null>(null);

  const [transcribeInterviewAudio, { isLoading: isTranscribing }] =
    useTranscribeInterviewAudioMutation();

  const [isRecording, setIsRecording] = useState(false);

  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const audioChunksRef = useRef<Blob[]>([]);

  const recordingTimerRef = useRef<number | null>(null);

  const [evaluateInterviewAnswer, { isLoading: isEvaluating }] =
    useEvaluateInterviewAnswerMutation();

  const currentQuestion = prep.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  const handleSubmit = async () => {
    if (!answer.trim() || isEvaluating) {
      return;
    }

    try {
      const result = await evaluateInterviewAnswer({
        jobId,
        question: currentQuestion.question,
        answer: answer.trim(),
      }).unwrap();

      setEvaluation(result);
    } catch (error) {
      console.error("Interview answer evaluation failed:", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= prep.questions.length - 1) {
      return;
    }

    setCurrentQuestionIndex((previous) => previous + 1);

    setAnswer("");
    setEvaluation(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType,
        });

        stream.getTracks().forEach((track) => track.stop());

        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();

      setIsRecording(true);
      setRecordingTime(0);

      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime((previous) => previous + 1);
      }, 1000);
    } catch (error) {
      console.error("Unable to access microphone:", error);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) {
      return;
    }

    if (recorder.state !== "inactive") {
      recorder.stop();
    }

    setIsRecording(false);

    if (recordingTimerRef.current !== null) {
      window.clearInterval(recordingTimerRef.current);

      recordingTimerRef.current = null;
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();

      const extension = audioBlob.type.includes("webm")
        ? "webm"
        : audioBlob.type.includes("mp4")
          ? "mp4"
          : "audio";

      formData.append("file", audioBlob, `interview-answer.${extension}`);

      const result = await transcribeInterviewAudio(formData).unwrap();

      setAnswer(result.transcript);
    } catch (error) {
      console.error("Audio transcription failed:", error);
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current !== null) {
        window.clearInterval(recordingTimerRef.current);
      }

      const recorder = mediaRecorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
      }
    };
  }, []);

  return (
    <section className="interview-session">
      {/* ======================================================
          Header
      ====================================================== */}

      <div className="interview-session__header">
        <span className="interview-session__eyebrow">
          AI INTERVIEW SIMULATOR
        </span>

        <Typography component="h2" className="interview-session__title">
          Practice Your Interview
        </Typography>

        <Typography className="interview-session__subtitle">
          Answer the question as if you were speaking to a real interviewer.
        </Typography>
      </div>

      {/* ======================================================
          Progress
      ====================================================== */}

      <div className="interview-session__progress">
        <Typography>
          Question <strong>{currentQuestionIndex + 1}</strong> of{" "}
          {prep.questions.length}
        </Typography>

        <div className="interview-session__progress-bar">
          <div
            className="interview-session__progress-value"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / prep.questions.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* ======================================================
          Question
      ====================================================== */}

      {!evaluation && (
        <Card className="interview-session__question-card" elevation={0}>
          <CardContent>
            <div className="interview-session__question-label">
              <PsychologyOutlined />

              <span>{currentQuestion.category}</span>

              <span className="interview-session__difficulty">
                {currentQuestion.difficulty}
              </span>
            </div>

            <Typography component="h3" className="interview-session__question">
              {currentQuestion.question}
            </Typography>

            {/* ==================================================
                Answer
            ================================================== */}

            <TextField
              fullWidth
              multiline
              minRows={7}
              maxRows={14}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your answer as if you were answering the interviewer..."
              className="interview-session__answer"
            />

            {/* ==================================================
                Actions
            ================================================== */}

            <div className="interview-session__actions">
              <Button
                variant="outlined"
                startIcon={isRecording ? <Stop /> : <Mic />}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing || isEvaluating}
                className={`interview-session__voice-button ${
                  isRecording
                    ? "interview-session__voice-button--recording"
                    : ""
                }`}
              >
                {isRecording
                  ? `Stop Recording ${formatRecordingTime(recordingTime)}`
                  : isTranscribing
                    ? "Transcribing..."
                    : "Record Answer"}
              </Button>

              <Button
                variant="contained"
                startIcon={
                  isEvaluating ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <Send />
                  )
                }
                onClick={handleSubmit}
                disabled={!answer.trim() || isEvaluating}
                className="interview-session__submit-button"
              >
                {isEvaluating ? "Evaluating..." : "Submit Answer"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ======================================================
          Evaluation
      ====================================================== */}

      {evaluation && (
        <Card className="interview-session__evaluation" elevation={0}>
          <CardContent>
            {/* Score */}

            <div className="interview-session__score">
              <Typography className="interview-session__score-label">
                Answer Score
              </Typography>

              <Typography className="interview-session__score-value">
                {evaluation.evaluation.score}
                <span>/10</span>
              </Typography>
            </div>

            {/* Strengths */}

            <div className="interview-session__feedback">
              <div className="interview-session__feedback-title">
                <CheckCircleOutlined />

                <span>What you did well</span>
              </div>

              <ul>
                {evaluation.evaluation.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Improvements */}

            <div className="interview-session__feedback">
              <div className="interview-session__feedback-title">
                <WarningAmberOutlined />

                <span>What you can improve</span>
              </div>

              <ul>
                {evaluation.evaluation.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Ideal Answer */}

            <div className="interview-session__ideal-answer">
              <div className="interview-session__feedback-title">
                <LightbulbOutlined />

                <span>Strong Answer</span>
              </div>

              <Typography>{evaluation.evaluation.idealAnswer}</Typography>
            </div>

            {/* Follow-up */}

            <div className="interview-session__follow-up">
              <Typography className="interview-session__follow-up-label">
                🔄 Follow-up Question
              </Typography>

              <Typography>{evaluation.evaluation.followUpQuestion}</Typography>
            </div>

            {/* Next */}

            <div className="interview-session__next">
              <Button
                variant="contained"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex >= prep.questions.length - 1}
              >
                {currentQuestionIndex >= prep.questions.length - 1
                  ? "Interview Complete"
                  : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default InterviewSession;
