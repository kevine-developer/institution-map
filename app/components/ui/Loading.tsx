import { Institution } from "@/app/types";

interface LoadingProps {
  institutions: Institution[];
}
function Loading({ institutions }: LoadingProps) {
  return (
     <div className="fixed inset-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm flex flex-col justify-center items-center z-50 transition-opacity duration-300">
          <svg
            className="animate-spin h-12 w-12 text-emerald-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-200">
            Chargement des institutions...
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {institutions.length > 0
              ? `${institutions.length} institutions chargées`
              : "Connexion à l'API..."}
          </p>
        </div>
  )
}

export default Loading