import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CreditCardIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </Svg>
  );
}

export function FileTextIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </Svg>
  );
}

export function CalendarIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </Svg>
  );
}

export function FolderIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </Svg>
  );
}

export function MicIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </Svg>
  );
}

export function AlertTriangleIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </Svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <polyline points="20 6 9 17 4 12" />
    </Svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Svg>
  );
}

export function ArrowLeftIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="19" x2="5" y1="12" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Svg>
  );
}

export function ClipboardCheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </Svg>
  );
}

export function GlobeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Svg>
  );
}

export function PlaneIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M17.8 19.2 16 11l3.5-3.5A2.12 2.12 0 0 0 16.5 4.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
    </Svg>
  );
}

export function BookOpenIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </Svg>
  );
}

export function MessagesIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

export function ShieldCheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export const STAGE_ICONS = {
  'mrv-fee': CreditCardIcon,
  'ds-160': FileTextIcon,
  scheduling: CalendarIcon,
  documents: FolderIcon,
  interview: MicIcon,
} as const;

export const GROUP_ICONS = {
  required: ClipboardCheckIcon,
  ties: ShieldCheckIcon,
  trip: PlaneIcon,
} as const;
