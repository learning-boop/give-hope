// Hand-drawn hearts and a looping line that sit around a brush-shaped photo. Decorative only.
const Heart = ({ className }) => (
  <svg className={`doodle ${className}`} viewBox="0 0 32 30" aria-hidden="true" focusable="false">
    <path d="M16 28C9 22 2 17 2 9.5 2 5 5.5 2 9.5 2c2.8 0 5 1.6 6.5 4 1.5-2.4 3.7-4 6.5-4C26.5 2 30 5 30 9.5 30 17 23 22 16 28z" />
  </svg>
)

export default function Doodles() {
  return (
    <>
      <Heart className="doodle--a" />
      <Heart className="doodle--b" />
      <Heart className="doodle--c" />
      <svg className="doodle doodle--loop" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
        <path d="M4 104c34 10 62-4 74-24 10-17-6-32-20-22-16 12 4 40 34 38 36-3 54-34 72-58 10-14 24-22 46-20" />
        <path className="doodle__tip" d="M196 8l14 10-16 8" />
      </svg>
    </>
  )
}
