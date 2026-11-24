import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { shareFundraiser } from '../lib/share'
import { Photo } from '../components/ui'
import PostCard from '../components/PostCard'
import { POSTS, formatPostDate as formatDate, getPost, postPath, readingTime } from '../data/blog'
import { SITE } from '../site'
import NotFound from './NotFound'

/** /blog/<slug>/ — one article, with related posts and a call to give. */
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const path = postPath(post.slug)
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.organisation.name },
    mainEntityOfPage: SITE.url + path,
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={path} jsonLd={jsonLd} />

      <article className="section blog-post">
        <div className="container blog-post__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog/">Blog</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{post.category}</span>
          </nav>
          <h1 className="display blog-post__title">{post.title}</h1>
          <p className="lead">{post.excerpt}</p>
          <p className="blog-post__meta">
            <span>By the {SITE.name} team</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTime(post)} min read</span>
            <button type="button" className="text-link blog-post__share" onClick={() => shareFundraiser({ title: post.title, path })}>
              <Icon name="share" size={16} /> Share
            </button>
          </p>
          <figure className="blog-post__photo">
            <Photo name={post.photo} priority sizes="(max-width: 900px) 100vw, 820px" />
          </figure>

          <div className="blog-post__body">
            {post.body.map((b, i) =>
              b.h ? (
                <h2 className="h3" key={i}>
                  {b.h}
                </h2>
              ) : b.list ? (
                <ul key={i}>
                  {b.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : b.note ? (
                <p className="blog-post__note" key={i}>
                  {b.note}
                </p>
              ) : (
                <p key={i}>{b.p}</p>
              ),
            )}
          </div>

          <aside className="ngo-join blog-post__cta" aria-label="Give">
            <div>
              <h2 className="h3">Ready to make a difference?</h2>
              <p className="body">Give to a verified fundraiser, or support a mission every month.</p>
            </div>
            <div className="cta-row">
              <a href="/#fundraisers" className="btn btn--primary">
                Donate now
              </a>
              <Link to="/monthly/" className="btn btn--outline">
                Give monthly
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section--cream" aria-labelledby="related-title">
          <div className="container">
            <h2 className="h2" id="related-title">
              Keep reading
            </h2>
            <div className="blog-grid">
              {related.map((p) => (
                <PostCard post={p} key={p.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
