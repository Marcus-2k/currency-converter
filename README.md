# Currency Converter

A modern Angular application for converting currencies using real-time exchange rates.

## Quick Start

### Prerequisites

- Node.js (version 18+)
- Angular CLI: `npm install -g @angular/cli`

### Setup

```bash
# Clone and install
git clone <repository-url>
cd currency-converter
npm install

# Start development server
npm start
```

Open `http://localhost:4200/` in your browser.

## API Configuration

The app uses CurrencyBeacon API with credentials already configured in `src/environments/environment.ts`.

To use your own API key:

1. Sign up at [CurrencyBeacon](https://currencybeacon.com/)
2. Replace the API key in `src/environments/environment.ts`

## Available Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Tech Stack

- Angular 19
- PrimeNG UI components
- CurrencyBeacon API
- TypeScript

## Troubleshooting

**Port 4200 in use?**

```bash
npm start -- --port 4201
```

**Dependency issues?**

```bash
rm -rf node_modules package-lock.json
npm install
```
