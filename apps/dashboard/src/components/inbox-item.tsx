import { cn } from "@midday/ui/cn";
import { Skeleton } from "@midday/ui/skeleton";
import { format } from "date-fns";
import { useQueryState } from "nuqs";
import { FormatAmount } from "./format-amount";
import { InboxStatus } from "./inbox-status";

export function InboxItem({ item }) {
  const [selectedId, setSelectedId] = useQueryState("inboxId");

  const isSelected = selectedId === item.id;
  const isProcessing = item.status === "processing" || item.status === "new";

  return (
    <button
      type="button"
      onClick={() => {
        setSelectedId(item.id);
      }}
      key={item.id}
      className={cn(
        "flex flex-col w-full items-start gap-2 border p-4 text-left text-sm",
        isSelected && "bg-accent border-[#DCDAD2] dark:border-[#2C2C2C]",
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center mb-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <div className="font-semibold">
                {isProcessing ? (
                  <Skeleton className="h-3 w-[120px] rounded-sm mb-1" />
                ) : (
                  item.display_name
                )}
              </div>
            </div>
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              isSelected ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {isProcessing && <Skeleton className="h-3 w-[50px] rounded-sm" />}
            {!isProcessing && item?.date && format(new Date(item.date), "PP")}
          </div>
        </div>

        <div className="flex">
          <div className="text-xs font-medium">
            {isProcessing && <Skeleton className="h-3 w-[50px] rounded-sm" />}
            {!isProcessing && item?.currency && item?.amount && (
              <FormatAmount amount={item.amount} currency={item.currency} />
            )}
          </div>

          <div className="ml-auto">
            <InboxStatus item={item} />
          </div>
        </div>
      </div>
    </button>
  );
}
