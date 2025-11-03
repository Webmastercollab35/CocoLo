import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

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
  const [isNarrating, setIsNarrating] = useState(false)
  const audioCtxRef = useRef(null)
  const backgroundRef = useRef(null)
  const narrationAudioRef = useRef(null)
  const speechSynthesisRef = useRef(null)
  const utteranceRef = useRef(null)

  const stopNarration = useCallback(() => {
    if (narrationAudioRef.current) {
      narrationAudioRef.current.pause()
      narrationAudioRef.current.currentTime = 0
      narrationAudioRef.current = null
    }

    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel()
    }

    utteranceRef.current = null
    setIsNarrating(false)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioCtx()
      if ('speechSynthesis' in window) {
        speechSynthesisRef.current = window.speechSynthesis
      }
    }
    return () => {
      stopNarration()
      backgroundRef.current?.pause?.()
    }
  }, [stopNarration])

  const playSound = useCallback(async (key) => {
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
  }, [])

  const toggleBackground = useCallback(() => {
    setBackgroundEnabled((prev) => !prev)
  }, [])

  const narrate = useCallback(
    async ({ src, text }) => {
      stopNarration()

      const trySpeech = () => {
        if (
          !text ||
          !speechSynthesisRef.current ||
          typeof window === 'undefined' ||
          !window.SpeechSynthesisUtterance
        ) {
          return false
        }
        const utterance = new window.SpeechSynthesisUtterance(text)
        utterance.lang = 'fr-FR'
        utterance.rate = 0.92
        utterance.pitch = 1
        utterance.onend = () => {
          setIsNarrating(false)
          utteranceRef.current = null
        }
        utterance.onerror = () => {
          setIsNarrating(false)
          utteranceRef.current = null
        }
        utteranceRef.current = utterance
        speechSynthesisRef.current.cancel()
        speechSynthesisRef.current.speak(utterance)
        setIsNarrating(true)
        return true
      }

      if (src) {
        try {
          const audioElement = new Audio(src)
          await audioElement.play()
          narrationAudioRef.current = audioElement
          setIsNarrating(true)
          audioElement.addEventListener(
            'ended',
            () => {
              narrationAudioRef.current = null
              setIsNarrating(false)
            },
            { once: true }
          )
          return true
        } catch (error) {
          console.warn('Lecture audio impossible, utilisation de la synthèse vocale.', error)
        }
      }

      if (trySpeech()) {
        return true
      }

      setIsNarrating(false)
      return false
    },
    [stopNarration]
  )

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
      narrate,
      stopNarration,
      isNarrating,
      mascotteMessage: mascotteMessages[messageIndex],
      nextMessage,
    }),
    [
      backgroundEnabled,
      isNarrating,
      messageIndex,
      narrate,
      stopNarration,
      toggleBackground,
      playSound,
    ]
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
