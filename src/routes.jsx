import Layout from './components/Layout'
import Home from './pages/Home'
import Crowdfunding from './pages/Crowdfunding'
import Fundraiser from './pages/Fundraiser'
import Monthly from './pages/Monthly'
import About from './pages/About'
import Documents from './pages/Documents'
import NotFound from './pages/NotFound'
import { campaigns } from './data/campaigns'

// Every route below is prerendered to its own HTML file at build time.
export const routes = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.jsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'crowdfunding', element: <Crowdfunding /> },
      { path: 'monthly', element: <Monthly /> },
      { path: 'about', element: <About /> },
      { path: 'documents', element: <Documents /> },
      {
        path: 'fundraiser/:slug',
        element: <Fundraiser />,
        // One static page per fundraiser — add new slugs here (or fetch them from your API at build time)
        getStaticPaths: () => campaigns.map((c) => `fundraiser/${c.slug}`),
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
