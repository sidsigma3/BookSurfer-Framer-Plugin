# Antigravity Rules — BookSurfer Booking Plugin

## Project context
This is a Framer marketplace plugin. It has TWO separate React entry points:
- src/plugin/ → runs inside Framer's sidebar panel (config UI only)
- src/canvas/ → runs as a live component on the published Framer website

Never mix code from these two layers. They have different APIs and environments.

## Framer-specific rules
- Always import { addPropertyControls, ControlType } from "framer" — NOT framer-motion
- Always import { framer } from "framer-plugin" for panel-side SDK calls
- Use framer.clientStorage (not localStorage) for persisting plugin settings
- Property controls must be defined AFTER the component export, same file
- The canvas component must have a visible fallback when apiKey prop is empty
- Never use React Router — plugin panel is a single view with tab state only

## Code style
- TypeScript strict mode — no 'any' types, ever
- All props must have explicit interfaces defined in src/shared/types.ts
- Use clsx() for conditional classNames, never template literals for classes
- Prefer named exports except for the main canvas component (must be default export)
- File names: PascalCase for components, camelCase for utilities and hooks
- No inline styles on canvas components — use Tailwind classes only
- Plugin panel UI may use inline styles sparingly for dynamic values (e.g. color preview)

## Package constraints
- Do NOT install: react-router, framer-motion, @mui/material, emotion, @emotion/styled, recharts
- These are for the admin panel only — they will bloat and break the plugin bundle
- Allowed UI packages: @radix-ui/* (primitives only), lucide-react, @dnd-kit/core
- Always import lucide icons individually: import { X } from "lucide-react"

## API calls
- All fetch/axios calls live in src/shared/api.ts only — never inline in components
- Always send x-api-key header using the apiKey prop
- Always handle the case where the API call fails — show error state, never crash
- Base URL comes from import.meta.env.VITE_API_URL — never hardcode URLs

## Form behaviour
- Use React Hook Form + Zod for all form state and validation
- Field config (which fields show, required, labels) comes from FormConfig type
- Never hardcode field lists — always map over config.fields array
- The classId and className props come from Framer CMS bindings — treat as optional

## Styling
- Tailwind CSS 4 only — no custom CSS files except index.css for base resets
- Plugin panel max width: 240px (Framer sidebar constraint)
- Canvas form should be fully responsive — works at any width Framer sets
- Use CSS variables for the button color and background — they come from props

## What to always generate
- TypeScript interface for every new component's props
- Error boundary around canvas component
- Loading state for any async operation
- Empty/placeholder state for any list or data-dependent UI
