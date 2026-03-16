# FS Trade - Client Portal

A modern, high-performance client-facing application built with Next.js 16, designed for international trade and product cataloging.

## 🚀 Features

- **Multi-Language Support (i18n)**: Fully localized in English (EN), Mandarin (ZH), and Sinhala (SI).
- **Responsive Design**: Mobile-first architecture using Tailwind CSS 4.
- **Dynamic Content**: All sections (Hero, About, Products, Suppliers, etc.) are fetched from a centralized Node.js/PostgreSQL backend.
- **Micro-Animations**: Smooth interactions and animations using Lucide React and native CSS transitions.
- **SEO Optimized**: Pre-configured meta tags and sitemap generation for better search visibility.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: Custom API utility with type safety.

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables in `.env`:
   ```env
   NEXT_PUBLIC_API_BASEURL=http://localhost:8000/api
   NEXT_PUBLIC_SITE_URL=yourdomain.com
   ```

### Running Locally

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

- `/src/app/[lang]`: Localized routes and pages.
- `/src/components`: Reusable UI components.
- `/src/utils`: API handlers and language helpers.
- `/public`: Static assets and images.

---
Built with ❤️ for FS Trade.
