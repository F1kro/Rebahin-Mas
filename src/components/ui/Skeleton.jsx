import { cn } from "../../lib/utils"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        // Tambahkan border hitam tipis dan warna abu-abu yang lebih solid
        // Kita pakai animasi pulse yang lebih cepat agar terasa "energetic" khas komik
        "animate-pulse rounded-none border-2 border-black bg-gray-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        className
      )}
      {...props}
    />
  )
}

function MovieCardSkeleton() {
  return (
    <div className="space-y-4 p-2 border-2 border-transparent">
      {/* Poster area dengan aspect ratio yang tegas */}
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="space-y-2">
        {/* Title area */}
        <Skeleton className="h-5 w-5/6" />
        {/* Metadata area */}
        <Skeleton className="h-4 w-2/4" />
      </div>
    </div>
  )
}

function MovieGridSkeleton({ count = 12 }) {
  return (
    // Gap diperlebar dikit supaya shadow antar card gak tabrakan
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}

export { Skeleton, MovieCardSkeleton, MovieGridSkeleton }