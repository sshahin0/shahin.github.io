# Shahin's Portfolio & Blog

A modern portfolio website with a blog section that includes both a custom blog editor and Medium integration.

## Features

- Modern, responsive design
- Portfolio section showcasing projects and skills
- Blog section with:
  - Custom blog editor with rich text formatting
  - Medium integration to display your Medium articles
- Dark mode support
- Smooth animations and transitions
- SEO optimized

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- TipTap (Rich Text Editor)
- RSS2JSON API (for Medium integration)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shahin-portfolio.git
cd shahin-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages
│   ├── components/        # Reusable components
│   ├── globals.css        # Global styles
│   └── page.tsx           # Home page
├── components/            # Shared components
├── public/               # Static assets
└── styles/              # Additional styles
```

## Customization

1. Update the Medium RSS feed URL in `app/blog/page.tsx` with your Medium username
2. Modify the portfolio content in the home page
3. Customize the theme colors in `tailwind.config.js`

## Deployment

The site can be deployed to Vercel with zero configuration:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

## License

MIT License - feel free to use this template for your own portfolio! 