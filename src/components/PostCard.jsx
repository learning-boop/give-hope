import { Link } from 'react-router-dom'
import { Photo } from './ui'
import { formatPostDate, postPath, readingTime } from '../data/blog'

/** A blog post in a list: photo, topic, title, excerpt, date and reading time. */
export default function PostCard({ post }) {
  return (
    <Link to={postPath(post.slug)} className="blog-card">
      <span className="blog-card__photo">
        <Photo name={post.photo} alt="" sizes="(max-width: 720px) 100vw, 380px" />
      </span>
      <span className="blog-card__body">
        <span className="eyebrow">{post.category}</span>
        <span className="feature__title">{post.title}</span>
        <span className="small">{post.excerpt}</span>
        <span className="small blog-card__meta">
          {formatPostDate(post.date)} · {readingTime(post)} min read
        </span>
      </span>
    </Link>
  )
}
