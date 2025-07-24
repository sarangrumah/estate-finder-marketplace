# Sarang Rumah - Installation Guide

## Overview
Sarang Rumah adalah platform properti Indonesia yang menyediakan sistem manajemen properti lengkap dengan fitur admin dashboard, manajemen lead, dan chat terintegrasi.

## Version
**Current Version:** 1.0.0

## System Requirements
- Node.js 18.0.0 atau lebih tinggi
- npm 8.0.0 atau lebih tinggi (atau yarn 1.22.0+)
- Browser modern yang mendukung ES2020+

## Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd sarang-rumah
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Environment Setup
Buat file `.env.local` di root directory:
```env
# Application
VITE_APP_NAME=Sarang Rumah
VITE_APP_VERSION=1.0.0

# API Configuration (Optional)
VITE_API_BASE_URL=http://localhost:3000/api

# WhatsApp Integration
VITE_WHATSAPP_NUMBER=+628158882505
```

### 4. Development Server
```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### 5. Build untuk Production
```bash
npm run build
# atau
yarn build
```

## Features

### 🏠 Property Management
- CRUD operations untuk properti
- Import/Export data properti via CSV
- Manajemen unit tersedia dan terjual
- Upload gambar properti, floor plan, dan fasilitas
- Filter dan pencarian properti

### 👥 Developer Management
- CRUD operations untuk developer
- Import/Export data developer via CSV
- Tracking komisi dan proyek
- Status aktif/tidak aktif

### 📊 Lead Management
- Tracking lead dari website
- Status dan prioritas lead
- Riwayat komunikasi
- Flag system untuk lead penting

### 💬 Chat Integration
- Chat widget di semua halaman
- WhatsApp integration
- Real-time messaging support

### 📱 Admin Dashboard
- Statistik real-time
- Manajemen semua entitas
- Analytics dan reporting
- User-friendly interface

## Project Structure
```
src/
├── components/           # Reusable components
│   ├── admin/           # Admin-specific components
│   ├── ui/              # UI components (shadcn/ui)
│   └── ...
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── data/                # Mock data and constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── assets/              # Static assets
```

## Admin Access
Akses admin dashboard di `/admin` route.
Default credentials untuk development:
- Username: admin@sarangrumah.com
- Password: admin123

## CSV Import Format

### Properties CSV Template
```csv
title,description,price,address,city,state,type,bedrooms,bathrooms,area,developer,totalUnits,availableUnits,features,images
```

### Developers CSV Template
```csv
name,description,contactPerson,email,phone,address,website,establishedYear,totalProjects,commissionRate,status
```

## Deployment

### Vercel (Recommended)
1. Connect repository ke Vercel
2. Set environment variables
3. Deploy automatically

### Netlify
1. Build project: `npm run build`
2. Upload `dist` folder ke Netlify
3. Configure redirects untuk SPA

### Manual Server
1. Build project: `npm run build`
2. Serve `dist` folder dengan web server
3. Configure server untuk SPA routing

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_APP_NAME` | Application name | Sarang Rumah | No |
| `VITE_APP_VERSION` | Application version | 1.0.0 | No |
| `VITE_API_BASE_URL` | API base URL | - | No |
| `VITE_WHATSAPP_NUMBER` | WhatsApp contact number | - | Yes |

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## Security Features
- Input validation dan sanitization
- XSS protection
- CSRF protection ready
- Secure headers configuration

## Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache
   rm -rf node_modules
   npm install
   ```

2. **Port Already in Use**
   ```bash
   # Use different port
   npm run dev -- --port 3001
   ```

3. **Missing Dependencies**
   ```bash
   # Install missing peer dependencies
   npm install --legacy-peer-deps
   ```

## Development

### Code Style
Project menggunakan:
- ESLint untuk linting
- Prettier untuk formatting
- TypeScript untuk type safety

### Pre-commit Hooks
```bash
# Install husky
npm install --save-dev husky
npx husky install
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Support

### Documentation
- Technical docs: `/docs`
- API documentation: `/api-docs`
- Component storybook: `/storybook`

### Contact
- Email: support@sarangrumah.com
- WhatsApp: +628158882505
- GitHub Issues: [Create issue](repository-url/issues)

## License
Copyright © 2024 Sarang Rumah. All rights reserved.

## Changelog

### v1.0.0 (2024-01-01)
- Initial release
- Property management system
- Developer management system
- Lead management system
- Admin dashboard
- Chat integration
- CSV import/export
- Mobile responsive design
- WhatsApp integration