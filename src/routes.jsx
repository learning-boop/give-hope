import Layout from './components/Layout'
import Home from './pages/Home'
import Crowdfunding from './pages/Crowdfunding'
import RegisterNgo from './pages/RegisterNgo'
import Cause from './pages/Cause'
import { CAUSE_IDS } from './data/causes'
import Fundraiser from './pages/Fundraiser'
import Monthly from './pages/Monthly'
import About from './pages/About'
import Documents from './pages/Documents'
import Legal from './pages/Legal'
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
      { path: 'register-ngo', element: <RegisterNgo /> },
      {
        path: 'causes/:id',
        element: <Cause />,
        // One static page per cause, e.g. /causes/children/
        getStaticPaths: () => CAUSE_IDS.map((id) => `causes/${id}`),
      },
      { path: 'monthly', element: <Monthly /> },
      { path: 'about', element: <About /> },
      { path: 'documents', element: <Documents /> },
      { path: 'privacy-policy', element: <Legal doc="privacy" /> },
      { path: 'terms', element: <Legal doc="terms" /> },
      { path: 'refund-policy', element: <Legal doc="refund" /> },
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
