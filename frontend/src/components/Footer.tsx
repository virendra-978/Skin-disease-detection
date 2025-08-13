import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2 text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for healthcare innovation</span>
          </div>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Support</span>
            </a>
          </div>
          
          <div className="text-xs text-gray-400">
            <p>© 2025 Skin Disease Detection System. Built with React & AI.</p>
            <p className="mt-1">For educational and research purposes. Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;