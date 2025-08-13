// Common skin conditions and their descriptions
export const SKIN_CONDITIONS = {
  acne: {
    name: 'Acne',
    description: 'A common skin condition characterized by blocked hair follicles',
    severity: 'mild',
  },
  eczema: {
    name: 'Eczema',
    description: 'A condition that makes skin red and itchy',
    severity: 'moderate',
  },
  melanoma: {
    name: 'Melanoma',
    description: 'A type of skin cancer that develops from melanocytes',
    severity: 'severe',
  },
  psoriasis: {
    name: 'Psoriasis',
    description: 'An autoimmune disease that causes skin cells to build up rapidly',
    severity: 'moderate',
  },
  basal_cell_carcinoma: {
    name: 'Basal Cell Carcinoma',
    description: 'The most common type of skin cancer',
    severity: 'severe',
  },
  squamous_cell_carcinoma: {
    name: 'Squamous Cell Carcinoma',
    description: 'A type of skin cancer that forms in squamous cells',
    severity: 'severe',
  },
  dermatitis: {
    name: 'Dermatitis',
    description: 'General term for inflammation of the skin',
    severity: 'mild',
  },
  rosacea: {
    name: 'Rosacea',
    description: 'A common skin condition that causes redness and visible blood vessels',
    severity: 'mild',
  },
};

// File upload constraints
export const UPLOAD_CONSTRAINTS = {
  maxSize: 10 * 1024 * 1024, // 10MB
  acceptedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxDimension: 4096,
};

// API configuration
export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
};

export default {
  SKIN_CONDITIONS,
  UPLOAD_CONSTRAINTS,
  API_CONFIG,
};