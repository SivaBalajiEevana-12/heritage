"use client"

import { useState, useEffect } from "react"

export const useApi = (url, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
        console.error("API Error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchData()
    }
  }, [url, ...dependencies])

  return { data, loading, error }
}
