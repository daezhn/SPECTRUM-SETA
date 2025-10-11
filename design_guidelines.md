# SAETA Website Design Guidelines

## Design Approach
**Reference-Based**: Inspired by Accenture's premium corporate aesthetic, adapted for a production and live streaming company. Emphasis on visual impact, smooth interactions, and showcasing multimedia capabilities.

## Color Palette

### Dark Mode (Primary)
- **Background**: 0 0% 8% (Deep charcoal)
- **Surface**: 0 0% 12% (Elevated panels)
- **Primary Magenta**: 320 85% 55% (Brand accent)
- **Secondary Purple**: 270 70% 45% (Supporting accent)
- **Text Primary**: 0 0% 98%
- **Text Muted**: 0 0% 70%

### Light Mode (Secondary)
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Primary Magenta**: 320 75% 45% (Adjusted for readability)
- **Secondary Purple**: 270 60% 35%
- **Text Primary**: 0 0% 10%
- **Text Muted**: 0 0% 40%

## Typography

**Font Stack**: 
- Headlines: "Inter" or "DM Sans" (700-800 weight)
- Body: "Inter" (400-500 weight)
- Accent: "Space Grotesk" for numbers/stats (600 weight)

**Scale**:
- Hero H1: 3.5rem (desktop) / 2.25rem (mobile)
- Section H2: 2.5rem (desktop) / 1.875rem (mobile)
- Card H3: 1.5rem
- Body: 1rem / 1.125rem for lead text

## Layout System

**Spacing Primitives**: Use Tailwind units 4, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 (desktop) / py-12 (mobile)
- Card padding: p-8 / p-6
- Element gaps: gap-8, gap-12, gap-16

**Container Strategy**:
- Max width: max-w-7xl for content sections
- Hero: Full-width w-full
- Text blocks: max-w-4xl for readability

## Component Library

### Navigation
- Sticky header with blur backdrop (backdrop-blur-md bg-black/80)
- Logo left, navigation center/right
- Magenta underline animation on hover
- Mobile: Full-screen overlay menu with staggered fade-in

### Hero Section
- Full viewport height (min-h-screen) with gradient overlay
- Large hero image/video background with dark overlay (60% opacity)
- Centered content with bold typography
- Dual CTAs: Primary (magenta solid) + Secondary (outline with blur backdrop)
- Scroll indicator animation at bottom

### Service Cards
- Grid layout: 3 columns (desktop) / 1 column (mobile)
- Card style: Dark surface with subtle border, hover lift effect (scale-105)
- Icon top-left (magenta accent)
- Hover: Magenta gradient border animation
- Include brief description + "Learn more" link

### Case Studies/Portfolio
- Masonry grid or carousel slider
- Overlay text on hover with project details
- Category tags (small pills with purple/magenta)
- "View Project" CTA appears on hover

### Statistics Section
- 3-4 column grid
- Large numbers in Space Grotesk (magenta)
- Counter animation on scroll into view
- Descriptive text below numbers

### Gallery
- Lightbox-enabled grid
- 3-4 columns responsive
- Hover zoom effect on images
- Filter tabs for categories (Live Events, Content, Branding)

### Contact Form
- Two-column layout: Form left / Contact info right
- Floating label inputs with magenta focus ring
- Dark input backgrounds with subtle borders
- Submit button: Full-width magenta gradient

### Footer
- Three-column layout: About / Services / Contact
- Social icons with hover scale effect
- Newsletter signup (optional)
- Copyright and links in muted text

## Animations

**Scroll Animations** (use Framer Motion or GSAP):
- Fade-up on section entry (stagger children)
- Parallax on hero image (subtle)
- Counter animations for statistics
- Card hover: lift + glow effect

**Page Transitions**:
- Smooth fade between sections
- Sticky navigation appears after hero scroll

**Microinteractions**:
- Button hover: scale + glow
- Card hover: border gradient animation
- Link hover: underline slide-in

## Images

### Hero Section
- Large cinematic image: Professional production scene (cameras, lighting setup, or live event coverage) with dramatic lighting
- Overlay: Dark gradient (black 60% opacity) for text readability
- Alternative: Video background loop showing event highlights (muted, 20-30 seconds)

### Services Section
- 4 images for service cards:
  1. Live Streaming: Multi-camera setup at event
  2. Content Studio: Film production behind-the-scenes
  3. Brand & Digital: Designer working on screens
  4. Social Media: Analytics dashboard or content calendar

### Case Studies Gallery
- 6-9 portfolio images showcasing:
  - Live event coverage (crowds, stage, screens)
  - Professional video shoots
  - Branding deliverables (mockups)
  - Aerial drone footage examples

### About Section
- Team photo or equipment showcase
- ISO certification badge/visual
- Office/studio environment

All images: High contrast, professional quality, with consistent color grading (cooler tones with magenta/purple accents)

## Accessibility
- WCAG AA contrast ratios maintained
- Focus indicators: 2px magenta ring
- Alt text for all images
- Keyboard navigation fully supported
- Form labels properly associated