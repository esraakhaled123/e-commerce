import React from "react"
import { Skeleton } from "../../components/ui/skeleton"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"


export default function Loading() {
  return (
    <div className="container py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="text-center gap-y-2">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-[150px] w-full rounded-xl" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-[120px] mx-auto" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[180px] mx-auto" />
              <Skeleton className="h-4 w-[160px] mx-auto mt-2" />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[60px]" />
            </CardFooter>
           
          </Card>
        ))}
      </div>
    </div>
  )
}
