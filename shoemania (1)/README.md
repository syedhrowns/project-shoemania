# ShoeMania — Premium Sneaker Marketplace & VIP Vault

A high-performance, mobile-first e-commerce web application engineered for sneaker collectors and enthusiasts. ShoeMania delivers curated footwear collections, upcoming drop schedules, community street styling, and an exclusive authenticated VIP member vault.

---

## Key Features

- **Curated Multi-Brand Catalog**: Extensive collections across Nike, Adidas, New Balance, ASICS, Puma, Vans, Converse, and Reebok with real-time brand filtering and category sorting.
- **VIP Collector Vault**: Gated access to deadstock grails and rare archival releases with tiered member pricing and authenticated verification.
- **Live Releases & Drops Calendar**: Interactive release schedule with hype levels, release dates, and drop reminder modals.
- **Interactive Reviews & Street Styling**: Live 3D perspective review carousel featuring verified buyer feedback alongside an authenticated community street looks gallery.
- **Seamless Cart & Size Selection**: Responsive slide-over cart drawer with dynamic subtotal calculations, size pickers, and free shipping progress tracker.
- **Wishlist & Quick View**: Instant product modal previews and cross-session wishlist management.
- **Responsive Architecture**: Zero layout shift, liquid pill navigation, mobile-optimized touch drawers, and tailored modal viewports.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Motion](https://motion.dev/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [GitHub Pages](https://pages.github.com/) via [GitHub Actions](https://github.com/features/actions) |

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml        # Zero-config GitHub Pages CI/CD workflow
├── public/
│   ├── .nojekyll             # Prevents GitHub Pages Jekyll processing
│   └── 404.html              # SPA routing fallback redirect script
├── src/
│   ├── components/
│   │   ├── Logo.tsx          # Kinetic architectural brand monogram & logo
│   │   ├── ProductImage.tsx  # Optimized image loader with brand gradient fallback
│   │   └── ReviewsCarousel.tsx # 3D perspective automated reviews slider
│   ├── App.tsx               # Main application layout and state logic
│   ├── data.ts               # Sneaker catalogue & product specifications
│   ├── index.css             # Global Tailwind v4 styles & typography rules
│   └── main.tsx              # React entry point with ErrorBoundary
├── index.html                # Entry point with meta tags & SPA decode script
├── package.json              # Project dependencies & scripts
├── tsconfig.json             # TypeScript compiler configuration
└── vite.config.ts            # Vite bundler configuration (relative base path)
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher (Node `v20.x` LTS recommended)
- **npm**: `v9.0.0` or higher

### Local Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/shoemania.git
   cd shoemania
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify TypeScript & linting:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   Assets will be compiled and bundled into the `dist/` folder.

6. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 1-Click GitHub Pages Deployment

This project includes a fully automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Setup Instructions

1. Push this repository to GitHub (on `main` or `master` branch).
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The deployment pipeline will trigger automatically on every push to `main`/`master`, or manually via the **Run workflow** button in the Actions tab.

---

## License

Private & Proprietary. All rights reserved. Built for client delivery.
