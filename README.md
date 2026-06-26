# Sentinel 🛡️

Sentinel is an enterprise-grade authentication platform featuring a state-of-the-art UI, robust security flows, and seamless integration with Cloudflare Turnstile for bot protection. Built with modern web technologies, it offers a dynamic, animated user experience designed to showcase high-security authentication workflows.

## ✨ Features

- **Modern & Premium UI:** Crafted with Tailwind CSS, featuring glassmorphism, responsive layouts, and curated color palettes (emerald, indigo, slate).
- **Interactive Auth Showcase:** A fully animated, interactive product demonstration of the authentication workflow built using Framer Motion.
- **Cloudflare Turnstile Integration:** Embedded privacy-preserving captcha validation on both Login and Signup forms to ensure secure, bot-free authentication.
- **Seamless Page Flow:** Continuous, elegant background grids and lighting effects spanning across different sections.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Security:** [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (`@marsidev/react-turnstile`)
- **Icons:** HugeIcons, Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd sentinel
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env.local` file in the root directory and add your Cloudflare Turnstile Site Key:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key_here
```

*(Note: You can get a free site key from the [Cloudflare Turnstile dashboard](https://dash.cloudflare.com/?to=/:account/turnstile).)*

### Running the Development Server

Start the application locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/` - Next.js App Router structure containing the main pages (`/login`, `/signup`, etc.) and API routes.
- `components/` - Reusable React components:
  - `SentinelHero.jsx` - The main landing page hero section.
  - `auth-showcase/` - The animated authentication product demonstration.
  - `login-form.jsx` & `signup-form.jsx` - The secure authentication forms with Turnstile integration.
  - `ui/` - Foundational UI components (buttons, background effects).

## 📄 License

This project is licensed under the MIT License.
