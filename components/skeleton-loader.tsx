export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 bg-muted rounded-lg"></div>
      <div className="h-4 bg-muted rounded-lg w-3/4"></div>
      <div className="h-4 bg-muted rounded-lg w-1/2"></div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="p-6 bg-card rounded-lg border border-border animate-pulse">
      <div className="h-40 bg-muted rounded-lg mb-4"></div>
      <div className="h-6 bg-muted rounded-lg mb-2"></div>
      <div className="h-4 bg-muted rounded-lg w-3/4"></div>
    </div>
  )
}

export function TeamMemberSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-muted rounded-lg mb-4"></div>
      <div className="h-6 bg-muted rounded-lg mb-2"></div>
      <div className="h-4 bg-muted rounded-lg w-3/4"></div>
    </div>
  )
}
