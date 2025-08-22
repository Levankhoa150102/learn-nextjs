'use client'

import { useRouter } from "next/navigation";

function BlogPage() {
    const router = useRouter()
    return (
    <button type="button" onClick={() => router.push('/study', { scroll: false })}>
      Dashboard
    </button>
  )
}

export default BlogPage;