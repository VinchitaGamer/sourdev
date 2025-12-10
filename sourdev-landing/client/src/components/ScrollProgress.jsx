import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const p = (scrollTop / (scrollHeight - clientHeight)) * 100
      setProgress(isFinite(p) ? p : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
      <div className="h-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#b6ff00,#d0ff30)' }} />
    </div>
  )
}
