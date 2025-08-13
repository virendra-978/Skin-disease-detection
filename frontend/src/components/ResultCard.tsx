import React from 'react';
import { CheckCircle, AlertTriangle, RotateCcw, Zap } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultCardProps {
  prediction: PredictionResult;
  imageUrl: string;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ prediction, imageUrl, onReset }) => {
  const { predicted_class, confidence } = prediction;
  const confidencePercentage = Math.round(confidence * 100);
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 0.8) return 'from-green-400 to-green-500';
    if (confidence >= 0.6) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  const getIcon = (confidence: number) => {
    if (confidence >= 0.7) {
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
    return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Analysis Complete</h2>
          </div>
          <button
            onClick={onReset}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            title="Analyze new image"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={imageUrl}
                alt="Analyzed skin image"
                className="w-full max-w-sm mx-auto rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {getIcon(confidence)}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Detected Condition
                </h3>
                <p className="text-2xl font-bold text-gray-800 capitalize">
                  {predicted_class.replace(/_/g, ' ')}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Confidence Level
                </span>
                <span className={`text-2xl font-bold ${getConfidenceColor(confidence)}`}>
                  {confidencePercentage}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getConfidenceBarColor(confidence)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${confidencePercentage}%` }}
                ></div>
              </div>
              
              <div className="text-sm text-gray-600">
                {confidence >= 0.8 && "High confidence - Very reliable result"}
                {confidence >= 0.6 && confidence < 0.8 && "Moderate confidence - Consider additional consultation"}
                {confidence < 0.6 && "Low confidence - Recommend professional medical evaluation"}
              </div>
            </div>
            {/* Disease Overview */}
            <div className="space-y-2 text-sm text-gray-700">
              <h4 className="font-semibold text-base">About This Condition</h4>
              <p>
                {predicted_class === "benign_keratosis" && (
                  <>Benign keratosis is a non-cancerous skin lesion commonly caused by aging or sun exposure. It often appears as a rough, scaly patch.</>
                )}
                {predicted_class === "melanoma" && (
                  <>Melanoma is a serious form of skin cancer. Early detection is crucial, as it can spread quickly to other parts of the body.</>
                )}
                {predicted_class === "melanocytic_nevi" && (
                  <>Melanocytic nevi are common moles and generally harmless, but changes in size or color should be evaluated by a doctor.</>
                )}
                {/* Add more cases as needed */}
              </p>
            </div>

            {/* Risk Level Badge */}
            <div className="mt-4">
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                {confidence >= 0.8 ? "Low Risk" : confidence >= 0.6 ? "Medium Risk" : "High Risk"}
              </span>
            </div>

            {/* Follow-Up Advice */}
            <div className="text-sm text-gray-600 mt-2">
              <strong>Recommended Next Steps:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {confidence >= 0.8 && <li>No immediate action needed, but monitor regularly.</li>}
                {confidence >= 0.6 && confidence < 0.8 && <li>Consider consulting a dermatologist for confirmation.</li>}
                {confidence < 0.6 && <li>Seek a professional evaluation as soon as possible.</li>}
              </ul>
            </div>

            {/* Learn More Link */}
            <div className="mt-4 text-sm">
              <a
                href={`https://dermnetnz.org/topics/${predicted_class.replace(/_/g, "-")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Learn more about {predicted_class.replace(/_/g, ' ')} →
              </a>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;