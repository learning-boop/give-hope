import Layout from './components/Layout'
import Home from './pages/Home'
import Crowdfunding from './pages/Crowdfunding'
import RegisterNgo from './pages/RegisterNgo'
import Cause from './pages/Cause'
import Donate from './pages/Donate'
import Mission from './pages/Mission'
import { MONTHLY_PLANS } from './data/monthly'
import Ngos from './pages/Ngos'
import Impact from './pages/Impact'
import HowItWorks from './pages/HowItWorks'
import GiftCards from './pages/GiftCards'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import FestivalCalendar from './pages/FestivalCalendar'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Login from './pages/Login'
import { POSTS } from './data/blog'
import NgoProfile from './pages/NgoProfile'
import { NGOS, NGO_CITIES } from './data/ngos'
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
      {
        path: 'missions/:id',
        element: <Mission />,
        // One page per monthly mission, e.g. /missions/animals/
        getStaticPaths: () => MONTHLY_PLANS.map((m) => `missions/${m.id}`),
      },
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => POSTS.map((p) => `blog/${p.slug}`),
      },
      { path: 'indian-festival-calendar', element: <FestivalCalendar /> },
      { path: 'careers', element: <Careers /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'impact', element: <Impact /> },
      { path: 'how-your-donation-works', element: <HowItWorks /> },
      { path: 'gift-cards', element: <GiftCards /> },
      { path: 'ngos', element: <Ngos /> },
      {
        path: 'ngos/city/:city',
        element: <Ngos />,
        getStaticPaths: () => NGO_CITIES.map((c) => `ngos/city/${c.id}`),
      },
      {
        path: 'ngos/:id',
        element: <NgoProfile />,
        getStaticPaths: () => NGOS.map((n) => `ngos/${n.id}`),
      },
      {
        path: 'donate/ngo/:slug',
        element: <Donate kind="ngo" />,
        getStaticPaths: () => NGOS.map((n) => `donate/ngo/${n.id}`),
      },
      {
        path: 'donate/mission/:slug',
        element: <Donate kind="mission" />,
        getStaticPaths: () => MONTHLY_PLANS.map((m) => `donate/mission/${m.id}`),
      },
      {
        path: 'donate/:slug',
        element: <Donate />,
        // The donation steps for each fundraiser, e.g. /donate/heart-surgery-for-a-6-year-old/
        getStaticPaths: () => campaigns.map((c) => `donate/${c.slug}`),
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
