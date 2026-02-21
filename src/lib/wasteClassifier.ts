// Simulated waste classification
// Maps common image characteristics to waste categories
// In production, this would call a TensorFlow.js model or backend API

const categories = ["Biodegradable", "Recyclable", "Non-Biodegradable"] as const;
export type WasteCategory = (typeof categories)[number];

export interface ClassificationResult {
  label: WasteCategory;
  confidence: number;
  allPredictions: { label: WasteCategory; confidence: number }[];
}

export async function classifyWaste(_file: File): Promise<ClassificationResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

  // Generate simulated predictions
  const primaryIdx = Math.floor(Math.random() * 3);
  const primaryConfidence = 70 + Math.random() * 25;
  const remaining = 100 - primaryConfidence;
  const secondaryConfidence = remaining * (0.5 + Math.random() * 0.3);
  const tertiaryConfidence = remaining - secondaryConfidence;

  const allPredictions = categories.map((label, idx) => ({
    label,
    confidence:
      idx === primaryIdx
        ? primaryConfidence
        : idx === (primaryIdx + 1) % 3
        ? secondaryConfidence
        : tertiaryConfidence,
  }));

  allPredictions.sort((a, b) => b.confidence - a.confidence);

  return {
    label: allPredictions[0].label,
    confidence: allPredictions[0].confidence,
    allPredictions,
  };
}
