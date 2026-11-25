import AlgorithmCenter from "../components/algorithms/AlgorithmCenter";

export default function AlgorithmWorkspace() {
  return (
    <AlgorithmCenter
      onOpenLesson={(lessonId, title) => {
        window.location.hash = `lesson/${encodeURIComponent(lessonId)}/${encodeURIComponent(title)}`;
      }}
    />
  );
}
