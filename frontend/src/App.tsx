import React, { useState } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import { PredictionResult } from './types';

function App() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handlePredictionComplete = (result: PredictionResult, imageUrl: string) => {
    setPrediction(result);
    setUploadedImage(imageUrl);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setPrediction(null);
  };

  const handleReset = () => {
    setPrediction(null);
    setError(null);
    setUploadedImage(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main className="max-w-4xl mx-auto space-y-8">
          <ImageUpload
            onPredictionComplete={handlePredictionComplete}
            onError={handleError}
            onReset={handleReset}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          {prediction && uploadedImage && (
            <ResultCard
              prediction={prediction}
              imageUrl={uploadedImage}
              onReset={handleReset}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;