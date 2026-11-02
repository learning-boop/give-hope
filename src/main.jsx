import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/pages.css'
import './styles/sections.css'
import './styles/effects.css'

// Prerenders every route to static HTML at build time, then hydrates into a normal React app.
export const createRoot = ViteReactSSG({ routes })
