
function LocalisationNotFound() {
  return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-[1001]">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-sm mx-4 text-center">
            <div className="text-slate-400 dark:text-slate-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Aucune localisation disponible
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Les institutions chargées n'ont pas de coordonnées géographiques
              pour être affichées sur la carte.
            </p>
          </div>
        </div>
  )
}

export default LocalisationNotFound