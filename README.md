# 🏠 Sarang Rumah - Comprehensive Property Management Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.11-blue.svg)

Sarang Rumah adalah platform manajemen properti modern yang dibuat khusus untuk pasar Indonesia. Platform ini menyediakan solusi lengkap untuk developer, agen properti, dan pembeli dalam satu ekosistem yang terintegrasi.

## ✨ Features

### 🏢 Property Management
- **CRUD Operations**: Create, Read, Update, Delete properti dengan mudah
- **Unit Tracking**: Monitor unit tersedia, terjual, dan total inventory
- **Multi-Image Support**: Upload gambar properti, floor plan, dan fasilitas
- **Advanced Filtering**: Filter berdasarkan lokasi, harga, tipe, dan spesifikasi
- **CSV Import/Export**: Bulk data management dengan template CSV

### 👥 Developer Management
- **Profile Management**: Kelola informasi lengkap developer
- **Commission Tracking**: Monitor rate komisi dan performa
- **Project Portfolio**: Track semua proyek developer
- **Contact Integration**: Informasi kontak dan website terintegrasi

### 📊 Lead Management
- **Lead Tracking**: Monitor semua lead dari berbagai sumber
- **Priority System**: Klasifikasi lead berdasarkan prioritas
- **Communication History**: Riwayat komunikasi lengkap
- **Status Workflow**: Track progress dari lead hingga closing
- **Flag System**: Tandai lead penting untuk follow-up

### 💬 Communication Features
- **Chat Widget**: Live chat terintegrasi di semua halaman
- **WhatsApp Integration**: Direct contact via WhatsApp
- **Property Inquiry**: Formulir inquiry dengan property pre-fill
- **Admin Notifications**: Real-time notifications untuk admin

### 📱 Admin Dashboard
- **Real-time Analytics**: Statistik properti, lead, dan performa
- **Comprehensive Management**: Kelola semua entitas dalam satu dashboard
- **Export Reports**: Generate laporan dalam format CSV
- **User Management**: Multi-user admin access (ready for implementation)

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0+
- npm 8.0.0+ atau yarn 1.22.0+

### Installation
```bash
# Clone repository
git clone <repository-url>
cd sarang-rumah

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create `.env.local`:
```env
VITE_APP_NAME=Sarang Rumah
VITE_APP_VERSION=1.0.0
VITE_WHATSAPP_NUMBER=+6281234567890
```

Visit `http://localhost:5173` untuk melihat aplikasi.

## 📖 Documentation

### Admin Access
- URL: `/admin`
- Default: admin@sarangrumah.com / admin123

### CSV Import Templates
Platform menyediakan template CSV untuk import data:
- **Properties**: Bulk upload properti dengan semua detail
- **Developers**: Import data developer dan portfolio

### API Integration Ready
Struktur code sudah siap untuk integrasi dengan backend API:
- Modular service architecture
- TypeScript interfaces
- Error handling
- Loading states

## 🛠 Tech Stack

### Frontend
- **React 18.3.1**: Modern React dengan concurrent features
- **TypeScript 5.5.3**: Type-safe development
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **React Router 6.26.2**: Client-side routing
- **React Hook Form**: Performant form management
- **Zod**: Schema validation

### Development Tools
- **Vite 5.4.1**: Fast build tool dan dev server
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Lucide React**: Beautiful icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/              # Admin-specific components
│   │   ├── PropertyForm.tsx
│   │   ├── DeveloperForm.tsx
│   │   └── ImportTemplate.tsx
│   ├── ui/                 # Reusable UI components
│   ├── Layout.tsx          # Main layout wrapper
│   ├── PropertyCard.tsx    # Property display card
│   ├── PropertyFilters.tsx # Property filtering
│   └── ChatWidget.tsx      # Chat integration
├── pages/
│   ├── Index.tsx           # Homepage
│   ├── PropertyDetails.tsx # Property detail page
│   ├── AdminDashboard.tsx  # Admin management
│   ├── About.tsx           # About page
│   └── Contact.tsx         # Contact page
├── types/
│   └── index.ts            # TypeScript definitions
├── data/
│   └── mockData.ts         # Sample data
├── hooks/
│   └── use-toast.ts        # Toast notifications
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Design System

### Color Palette
Platform menggunakan semantic color tokens:
- **Primary**: Brand colors untuk CTA dan highlights
- **Secondary**: Supporting colors untuk content
- **Muted**: Subtle colors untuk backgrounds
- **Destructive**: Error dan warning states

### Component Variants
Semua components memiliki multiple variants:
- **Buttons**: default, outline, secondary, destructive
- **Cards**: default, outlined, elevated
- **Badges**: default, secondary, outline, destructive

### Responsive Design
- **Mobile First**: Optimized untuk mobile experience
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: Flexible grid dengan Tailwind CSS

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # TypeScript validation
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Extended recommended rules
- **Prettier**: Consistent code formatting
- **Component Architecture**: Reusable dan maintainable

### Performance Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images dan components
- **Bundle Optimization**: Tree shaking dan minification
- **Caching Strategy**: Optimal cache headers

## 📊 Analytics & Monitoring

### Built-in Analytics
- Property view tracking
- Lead conversion metrics
- User interaction analytics
- Performance monitoring

### Integration Ready
- Google Analytics
- Facebook Pixel
- Custom analytics solutions
- A/B testing capabilities

## 🔒 Security Features

### Input Validation
- **Zod Schemas**: Comprehensive input validation
- **XSS Protection**: Sanitized user inputs
- **Type Safety**: TypeScript compile-time checks

### Data Protection
- **GDPR Compliance**: Privacy-first approach
- **Data Encryption**: Ready for sensitive data handling
- **Secure Headers**: Security best practices

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build
npm run build

# Upload dist/ folder to your hosting provider
```

### Environment Variables
Set these in your hosting platform:
- `VITE_APP_NAME`
- `VITE_APP_VERSION`
- `VITE_WHATSAPP_NUMBER`

## 📈 Roadmap

### Phase 1 (Current - v1.0.0)
- ✅ Property management system
- ✅ Developer management
- ✅ Lead tracking
- ✅ Admin dashboard
- ✅ Chat integration

### Phase 2 (v1.1.0)
- 🔄 User authentication system
- 🔄 Advanced analytics
- 🔄 Email notifications
- 🔄 Payment integration

### Phase 3 (v1.2.0)
- 📋 Mobile app
- 📋 Advanced reporting
- 📋 Multi-language support
- 📋 API marketplace

## 🤝 Contributing

### Development Setup
1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Code Standards
- Follow existing code style
- Add TypeScript types
- Write meaningful commit messages
- Update documentation

## 📞 Support

### Community
- **GitHub Issues**: Bug reports dan feature requests
- **Discord**: Real-time community support
- **Documentation**: Comprehensive guides

### Enterprise Support
- **Priority Support**: 24/7 technical assistance
- **Custom Development**: Tailored features
- **Training**: Team onboarding dan training

## 📄 License

Copyright © 2024 Sarang Rumah. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited.

## 🙏 Acknowledgments

- **shadcn/ui**: Beautiful component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide**: Beautiful icon set
- **React Team**: Amazing framework
- **TypeScript Team**: Type safety excellence

---

**Made with ❤️ for the Indonesian property market**

For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md)