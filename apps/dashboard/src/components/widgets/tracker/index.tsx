import { ErrorFallback } from "@/components/error-fallback";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { TrackerWidget, TrackerWidgetSkeleton } from "./tracker-widget";

export function Tracker({ date, hideDaysIndicators }) {
  return (
    <div className="border aspect-square overflow-hidden relative p-4 md:p-8">
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<TrackerWidgetSkeleton key={date} />}>
          <TrackerWidget date={date} hideDaysIndicators={hideDaysIndicators} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
