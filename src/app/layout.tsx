import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'US Visa Guide',
  description: 'Guia passo a passo para o visto americano de turismo.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
