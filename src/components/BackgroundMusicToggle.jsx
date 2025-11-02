import { MusicNoteIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import { useAudio } from '../context/AudioContext'

function Icon({ enabled }) {
  if (enabled) {
    return <SpeakerWaveIcon className="h-6 w-6" />
  }
  return <MusicNoteIcon className="h-6 w-6" />
}

export function BackgroundMusicToggle() {
  const { backgroundEnabled, toggleBackground } = useAudio()

  return (
    <button
      type="button"
      aria-label="Basculer la musique de fond"
      onClick={toggleBackground}
      className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-midnight shadow-lg transition hover:scale-105"
    >
      <Icon enabled={backgroundEnabled} />
      {backgroundEnabled ? 'Musique ON' : 'Musique OFF'}
    </button>
  )
}

export default BackgroundMusicToggle
