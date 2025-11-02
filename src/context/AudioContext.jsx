import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AudioContextState = createContext(null)

const feedbackSounds = {
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  cheer: '/sounds/cheer.mp3',
}

const mascotteMessages = [
  'Bravo ! Continue comme ça !',
  'Tu es un as des chiffres !',
  'Max&Co est fier de toi !',
  'Mission réussie, explorateur !',
]

export function AudioProvider({ children }) {
  const [backgroundEnabled, setBackgroundEnabled] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const audioCtxRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
  }, [])

  const playSound = async (key) => {
    const path = feedbackSounds[key]
    if (!path) return

    if (!audioCtxRef.current) return
    try {
      await audioCtxRef.current.resume?.()
      const response = await fetch(path)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer)
      const source = audioCtxRef.current.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioCtxRef.current.destination)
      source.start(0)
    } catch (err) {
      console.warn('Impossible de jouer le son', err)
    }
  }

  const toggleBackground = () => {
    setBackgroundEnabled((prev) => !prev)
  }

  useEffect(() => {
    if (!audioCtxRef.current) return
    if (!backgroundRef.current) {
      backgroundRef.current = new Audio('/sounds/background.mp3')
      backgroundRef.current.loop = true
      backgroundRef.current.volume = 0.25
    }

    if (backgroundEnabled) {
      backgroundRef.current.play().catch(() => {
        /* autoplay restrictions */
      })
    } else {
      backgroundRef.current.pause()
    }
  }, [backgroundEnabled])

  const nextMessage = () => {
    setMessageIndex((index) => (index + 1) % mascotteMessages.length)
  }

  const value = useMemo(
    () => ({
      playSound,
      backgroundEnabled,
      toggleBackground,
      mascotteMessage: mascotteMessages[messageIndex],
      nextMessage,
    }),
    [backgroundEnabled, messageIndex]
  )

  return <AudioContextState.Provider value={value}>{children}</AudioContextState.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioContextState)
  if (!ctx) {
    throw new Error('useAudio doit être utilisé dans un AudioProvider')
  }
  return ctx
}
