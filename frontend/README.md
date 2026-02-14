# Frontend README

## Next.js Frontend for Study Plus AI

Modern, responsive frontend built with Next.js 14, TypeScript, and Tailwind CSS.

### 🎨 Features

- **App Router** - Next.js 14 latest file-based routing
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Beautiful data visualizations
- **Glassmorphism** - Modern UI design with backdrop blur
- **Responsive** - Mobile-first design
- **Dark Mode Ready** - Pastel gradient theme

### 📦 Dependencies

- **next** - React framework
- **react 18** - UI library
- **typescript** - Type system
- **tailwindcss** - CSS framework
- **framer-motion** - Animation library
- **recharts** - Data charts
- **axios** - HTTP client
- **react-hot-toast** - Notifications

### 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

### 📁 Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── tests/             # Test management
├── components/            # React components
│   └── common/            # Shared UI components
├── context/               # React context
│   └── AuthContext.tsx    # Authentication state
├── services/              # API services
│   └── api.ts            # Axios client
├── utils/                 # Utility functions
├── hooks/                 # Custom hooks
└── styles/               # Global CSS
```

### 🎨 Tailwind Configuration

Customized with pastel colors and animations:

```javascript
// tailwind.config.js
{
  colors: {
    pastel: {
      lavender: "#e0c3fc",
      'sky-blue': "#8ec5fc",
      mint: "#a5fecb",
      peach: "#ffdab9",
      rose: "#ffb6c1",
    }
  },
  animation: {
    float: "float 3s ease-in-out infinite",
    glow: "glow 2s ease-in-out infinite",
  }
}
```

### 🔗 API Integration

All API calls go through the centralized `apiService`:

```typescript
// src/services/api.ts
apiService.getDashboard()    // Fetch dashboard metrics
apiService.uploadTest(data)  // Upload test result
apiService.login(email, pwd) // User login
```

### 🎬 Animations

Framer Motion used for smooth transitions:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

### 📊 Data Visualization

Recharts components for interactive charts:

```typescript
<ResponsiveContainer width="100%" height={250}>
  <AreaChart data={data}>
    <Area type="monotone" dataKey="score" />
  </AreaChart>
</ResponsiveContainer>
```

### 🔐 Authentication

Authentication state managed via React Context:

```typescript
const { user, isAuthenticated, login, logout } = useAuth()
```

### 🎯 Pages

- **/** - Homepage with features and CTA
- **/auth/login** - User login
- **/auth/register** - User registration
- **/dashboard** - Main analytics dashboard
- **/tests/upload** - Test result upload

### ⚙️ Development

```bash
# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and inputs

### 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Study Plus AI
```

### 📦 Build & Deploy

```bash
# Production build
npm run build

# Output: Next.js optimized build in .next/
# Ready for Vercel or any Node.js hosting
```

---

Built with ❤️ using Next.js & Tailwind CSS
