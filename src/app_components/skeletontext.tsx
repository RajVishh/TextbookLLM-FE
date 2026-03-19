import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonText() {
    return (
        <div className="flex w-full max-w-xs flex-col gap-2">
            <Skeleton className="h-4 w-full bg-[#1f1f1f]" />
            <Skeleton className="h-4 w-full bg-[#1f1f1f]" />
            <Skeleton className="h-4 w-3/4 bg-[#1f1f1f]" />
        </div>
    )
}
