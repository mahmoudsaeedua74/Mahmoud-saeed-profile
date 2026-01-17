# Brand Colors Reference

## Your Brand Identity Colors

These colors are now configured in `globals.css` and can be used throughout your portfolio:

### Color Palette

| Color Name | Hex Code | Tailwind Class | CSS Variable |
|------------|----------|----------------|--------------|
| **Primary** | `#4F46E5` | `bg-brand-primary` | `var(--color-brand-primary)` |
| **Background** | `#05070A` | `bg-brand-bg` | `var(--color-brand-bg)` |
| **Title** | `#F8FAFC` | `text-brand-title` | `var(--color-brand-title)` |
| **Text/Paragraph** | `#94A3B8` | `text-brand-text` | `var(--color-brand-text)` |

## Usage Examples

### Using Tailwind Classes
```tsx
// Background
<div className="bg-brand-bg">...</div>

// Text colors
<h1 className="text-brand-title">Welcome</h1>
<p className="text-brand-text">Description text</p>

// Primary color
<button className="bg-brand-primary">Click me</button>
```

### Using CSS Variables (for inline styles)
```tsx
// When you need more control
<div style={{ backgroundColor: 'var(--color-brand-bg)' }}>...</div>
<h1 style={{ color: 'var(--color-brand-title)' }}>Title</h1>
```

### Using Hex Codes Directly
```tsx
// For complex styles or Framer Motion
<motion.div style={{ backgroundColor: '#05070A' }}>...</motion.div>
```

## Current Implementation

✅ **LoadingScreen Component**
- Background: `#05070A` (brand-bg)
- Dot color: `#4F46E5` (brand-primary)
- Loading text: `#94A3B8` (brand-text)
- Logo: Clean display (no filters or shadows)

✅ **Welcome Component**
- Background: `#05070A` (brand-bg)
- Heading: `#F8FAFC` (brand-title)
- Subtitle & text: `#94A3B8` (brand-text)
- Decorative line: `#4F46E5` (brand-primary)
- Particles: `#4F46E5` with opacity

## Color Usage Guidelines

- **Primary (#4F46E5)**: Use for interactive elements, accents, and key visual elements
- **Background (#05070A)**: Main background color for dark theme
- **Title (#F8FAFC)**: Main headings and important text
- **Text (#94A3B8)**: Body text, descriptions, and secondary information
