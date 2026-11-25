import LessonPlayer from "../components/LessonPlayer";

interface JavaLearningProps {
  onBack: () => void;
}

export default function JavaLearning({ onBack }: JavaLearningProps) {
  return (
    <div>
      <button type="button" onClick={onBack}>Back to dashboard</button>
      <LessonPlayer onBack={onBack} />
    </div>
  );
}
