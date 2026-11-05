# Carte des packages

| Package | Chemin | Responsabilité | Depend de |
|---|---|---|---|
| `app` | `app/` | Routes Next.js App Router, SSR, Metadata & Layouts | `components`, `lib` |
| `components/hero` | `components/hero/` | Section Hero, CTAs & Shader OGL PortraitMorph | `lib`, `components/ui` |
| `components/projects` | `components/projects/` | Grille de réalisations & Menu 3D InfiniteMenu WebGL | `lib`, `components/ui` |
| `components/about` | `components/about/` | Expériences, compétences, éducation & Stack Matter.js | `lib`, `components/ui` |
| `components/contact` | `components/contact/` | Carte de contact, ShaderFlow & CTAs réseaux | `lib`, `components/shaders` |
| `lib` | `lib/` | Données locales, client Supabase, gestion de session et contexte | Supabase, React |

```mermaid
flowchart TD
    Layout["app/layout.tsx"] --> Nav["components/layout/nav.tsx"]
    Layout --> Page["app/page.tsx"]
    Layout --> Backdrop["components/layout/page-backdrop.tsx"]
    Page --> Hero["components/hero/hero.tsx"]
    Page --> Projects["components/projects/projects.tsx"]
    Page --> Contact["components/contact/contact-card.tsx"]
    Hero --> Morph["components/hero/portrait-morph.tsx (OGL Shader)"]
    Projects --> Menu3D["components/ui/InfiniteMenu.tsx (WebGL 3D Orbit)"]
    AboutPage["app/about/page.tsx"] --> Experience["components/about/experience.tsx"]
    AboutPage --> Skills["components/about/skills.tsx"]
    AboutPage --> Education["components/about/education.tsx"]
    AboutPage --> Stack["components/about/stack.tsx (Matter.js 2D Physics)"]
    Contact --> ShaderFlow["components/shaders/shader-flow.tsx"]
    Context["lib/portfolio-context.tsx"] --> Store["lib/portfolio-store.ts"]
    Store --> Supabase[("Supabase (portfolio_content)")]
    Store --> LocalData["data/portfolio.json"]
```
