import { useState } from "react";
import { Leaf, Recycle, Trash2 } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import ClassificationResult from "@/components/ClassificationResult";
import { classifyWaste } from "@/lib/wasteClassifier";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = async (file: File, previewUrl: string) => {
    setPreview(previewUrl);
    setResult(null);
    setIsLoading(true);
    try {
      const classification = await classifyWaste(file);
      setResult({ label: classification.label, confidence: classification.confidence });
    } catch {
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 gradient-eco opacity-80" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
            <Leaf className="h-4 w-4" />
            AI-Powered Waste Classification
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-primary-foreground leading-tight">
            Smart Waste Classifier
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Upload an image of waste to instantly classify it as Biodegradable, Recyclable, or Non-Biodegradable.
          </p>
        </div>
      </header>

      {/* Category Pills */}
      <div className="mx-auto max-w-4xl px-6 -mt-6 relative z-10">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Biodegradable", icon: Leaf, bg: "bg-biodegradable-bg", text: "text-biodegradable", border: "border-biodegradable/20" },
            { label: "Recyclable", icon: Recycle, bg: "bg-recyclable-bg", text: "text-recyclable", border: "border-recyclable/20" },
            { label: "Non-Biodegradable", icon: Trash2, bg: "bg-non-biodegradable-bg", text: "text-non-biodegradable", border: "border-non-biodegradable/20" },
          ].map(({ label, icon: Icon, bg, text, border }) => (
            <div key={label} className={`flex items-center gap-2 rounded-full ${bg} border ${border} px-5 py-2.5 shadow-sm`}>
              <Icon className={`h-4 w-4 ${text}`} />
              <span className={`text-sm font-medium ${text}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-6 py-12">
        {!preview ? (
          <ImageUploader onImageSelect={handleImageSelect} />
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img
                src={preview}
                alt="Uploaded waste"
                className="w-full max-h-[400px] object-contain bg-muted"
              />
            </div>

            {/* Result */}
            <ClassificationResult
              label={result?.label ?? null}
              confidence={result?.confidence ?? null}
              isLoading={isLoading}
            />

            {/* Reset Button */}
            {!isLoading && (
              <button
                onClick={handleReset}
                className="w-full rounded-xl border border-border bg-card py-3 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
              >
                Classify another image
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>Smart Waste Classifier — Helping sort waste for a cleaner planet 🌍</p>
      </footer>
    </div>
  );
};

export default Index;
