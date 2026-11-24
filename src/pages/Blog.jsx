import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import PostCard from '../components/PostCard'
import { Photo } from '../components/ui'
import { POSTS, formatPostDate as formatDate, postPath, readingTime } from '../data/blog'

/** /blog/ — every post, newest first, with a category filter. */
export default function Blog() {
  const categories = ['All', ...new Set(POSTS.map((p) => p.category))]
  const [category, setCategory] = useState('All')
  const list = category === 'All' ? POSTS : POSTS.filter((p) => p.category === category)
  const [featured, ...rest] = list

  return (
    <>
      <Seo title="Blog" description="Guides on tax benefits, giving wisely and monthly giving, plus ideas for celebrating special days by giving." path="/blog/" />

      <section className="section blog-head">
        <div className="container">
          <span className="eyebrow">Blog</span>
          <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Stories and guides on giving
          </h1>
          <div className="ngo-causes" role="group" aria-label="Filter posts by topic">
            {categories.map((c) => (
              <button type="button" className="chip" aria-pressed={category === c} onClick={() => setCategory(c)} key={c}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Posts">
        <div className="container">
          {featured && (
            <Link to={postPath(featured.slug)} className="blog-featured">
              <span className="blog-featured__photo">
                <Photo name={featured.photo} alt="" priority sizes="(max-width: 900px) 100vw, 640px" />
              </span>
              <span className="blog-featured__copy">
                <span className="eyebrow">{featured.category}</span>
                <span className="h2">{featured.title}</span>
                <span className="body">{featured.excerpt}</span>
                <span className="small">
                  {formatDate(featured.date)} · {readingTime(featured)} min read
                </span>
                <span className="text-link">
                  Read more <Icon name="arrowRight" size={18} strokeWidth={2.2} />
                </span>
              </span>
            </Link>
          )}
          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map((p) => (
                <PostCard post={p} key={p.slug} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
