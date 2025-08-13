# Skin Disease Detection System 🔬

A modern, responsive React frontend for AI-powered skin disease detection. Upload dermoscopic or clinical skin images and receive instant AI analysis with confidence scores.

![Skin Disease Detection](https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800)

## ✨ Features

- **Modern UI/UX**: Clean, responsive design with glassmorphism effects
- **Drag & Drop Upload**: Intuitive image upload with preview
- **AI Analysis**: Real-time skin disease prediction with confidence scores
- **Mobile Responsive**: Optimized for all device sizes
- **Professional Results**: Detailed analysis cards with visual confidence indicators
- **Error Handling**: Comprehensive error states and user feedback
- **Accessibility**: Built with accessibility best practices

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons
- **Vite** for fast development

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on port 5000 (or configure custom URL)

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your API URL:
   ```env
   VITE_API_URL=http://your-backend-url:8000
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

## 🏗️ Backend API Requirements

Your backend should provide a `/predict` endpoint that:

- Accepts `POST` requests with `multipart/form-data`
- Expects an `image` field with the uploaded file
- Returns JSON response:
  ```json
  {
    "predicted_class": "melanoma",
    "confidence": 0.87
  }
  ```

## 📦 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with branding
│   ├── ImageUpload.tsx # Upload interface
│   ├── ResultCard.tsx  # Results display
│   └── Footer.tsx      # App footer
├── services/           # API integration
│   └── api.ts         # API client and methods
├── types/             # TypeScript definitions
│   └── index.ts       # Shared interfaces
├── utils/             # Utility functions
│   └── constants.ts   # App constants
└── App.tsx            # Main application component
```

## 🎨 Design Features

- **Gradient Backgrounds**: Subtle medical-themed gradients
- **Glassmorphism Cards**: Modern card design with backdrop blur
- **Smooth Animations**: Loading states and transitions
- **Responsive Layout**: Mobile-first responsive design
- **Accessibility**: ARIA labels and keyboard navigation

## 🔒 Security & Privacy

- Client-side image validation
- File size and type restrictions
- No persistent storage of user images
- Secure API communication

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider

3. Configure environment variables for production

## 📱 Mobile Support

Fully responsive design with optimized layouts for:
- Mobile phones (< 768px)
- Tablets (768px - 1024px)  
- Desktop (> 1024px)

## ⚠️ Medical Disclaimer

This application is for educational and research purposes only. AI predictions should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For questions or support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ for healthcare innovation