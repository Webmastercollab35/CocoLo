const avatars = [
  { id: 'astronaute', src: '/assets/avatars/astronaute.svg', label: 'Astronaute rigolo' },
  { id: 'dragon', src: '/assets/avatars/dragon.svg', label: 'Dragon danseur' },
  { id: 'licorne', src: '/assets/avatars/licorne.svg', label: 'Licorne magique' },
  { id: 'pingouin', src: '/assets/avatars/pingouin.svg', label: 'Pingouin explorateur' },
]

function AvatarPicker({ selected, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {avatars.map((avatar) => {
        const isActive = selected === avatar.id
        return (
          <button
            key={avatar.id}
            type="button"
            onClick={() => onChange(avatar.id)}
            className={`flex flex-col items-center gap-2 rounded-3xl border-4 p-4 transition hover:-translate-y-1 hover:shadow-xl ${
              isActive ? 'border-candy bg-white shadow-lg' : 'border-transparent bg-white/80 shadow'
            }`}
          >
            <img src={avatar.src} alt={avatar.label} className="h-24 w-24 object-contain" />
            <span className="text-sm font-semibold text-midnight">{avatar.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default AvatarPicker
