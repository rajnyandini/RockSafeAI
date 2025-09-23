import { useState } from 'react';
import { PredictionForm } from '../components/PredictionForm';
import { PredictionResult } from '../components/PredictionResult';
import { predictRockfall } from '../services/predict';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Predict() {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Convert all string values to numbers except timestamp and location_id
      const processedData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (key === 'timestamp' || key === 'location_id') {
          acc[key] = value;
        } else {
          acc[key] = value === '' ? 0 : Number(value);
        }
        return acc;
      }, {} as Record<string, any>);

      console.log('Sending data:', processedData); // Debug log
      const prediction = await predictRockfall(processedData);
      console.log('Received prediction:', prediction); // Debug log
      setResult(prediction);
    } catch (err: any) {
      console.error('Prediction failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rockfall Prediction</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
        <PredictionResult result={result} />
      </div>
    </div>
  );
}