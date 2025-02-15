"use client"
// エラーバウンダリはClient Componentsでなければなりません

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーをエラーレポートサービスにログします
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>何かがうまくいきませんでした！</h2>
      <button
        onClick={
          // セグメントを再レンダリングして回復を試みます
          () => reset()
        }
      >
        もう一度試す
      </button>
    </div>
  )
}