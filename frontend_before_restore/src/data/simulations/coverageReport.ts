import { chapterSimulations } from "./chapterSimulations";

export function printSimulationCoverage() {
  let totalConcepts = 0;

  console.log("\n===== ALGORIX SIMULATION COVERAGE =====\n");

  for (const [lessonId, chapter] of Object.entries(chapterSimulations)) {
    totalConcepts += chapter.simulations.length;

    console.log(`${lessonId}: ${chapter.simulations.length} concepts`);

    chapter.simulations.forEach((simulation, index) => {
      console.log(`  ${index + 1}. ${simulation.title}`);
    });
  }

  console.log("\nTotal chapters:", Object.keys(chapterSimulations).length);
  console.log("Total concepts:", totalConcepts);
}
