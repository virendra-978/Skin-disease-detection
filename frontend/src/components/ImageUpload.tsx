import React, { useState, useRef, useCallback } from 'react';
import { Upload, Camera, X, Loader2 } from 'lucide-react';
import { predictSkinDisease } from '../services/api';
import { PredictionResult } from '../types';

interface ImageUploadProps {
  onPredictionComplete: (result: PredictionResult, imageUrl: string) => void;
  onError: (error: string) => void;
  onReset: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onPredictionComplete,
  onError,
  onReset,
  isLoading,
  setIsLoading
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      onError('Please select a valid image file (PNG, JPG, JPEG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, [onError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      onError('Please select an image first');
      return;
    }

    setIsLoading(true);
    try {
      const result = await predictSkinDisease(selectedFile);
      onPredictionComplete(result, previewUrl!);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to analyze image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="space-y-6">
        <div className="text-center">
          <Camera className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Skin Image</h2>
          <p className="text-gray-600">Drag and drop your image or click to browse</p>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : selectedFile
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!selectedFile ? handleUploadClick : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {previewUrl ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-xs max-h-48 rounded-lg shadow-md object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm font-medium text-green-600">
                {selectedFile?.name}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-16 w-16 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop your image here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports PNG, JPG, JPEG (Max 10MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRemoveImage}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Remove Image
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5" />
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;