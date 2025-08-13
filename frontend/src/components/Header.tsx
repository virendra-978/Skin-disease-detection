import React from 'react';
import { Activity, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex justify-center items-center mb-4">
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-full shadow-lg">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 bg-green-400 p-1 rounded-full">
            <Shield className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
        Skin Disease Detection
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Upload a dermoscopic or clinical skin image for AI-powered disease detection and confidence analysis
      </p>
      
      <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <span>Fast Analysis</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
          <span>Secure</span>
        </div>
      </div>
    </header>
  );
};

export default Header;