"use client";

import { importTransactionsAction } from "@/actions/transactions/import-transactions";
import { useUpload } from "@/hooks/use-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@midday/supabase/client";
import { getCurrentUserTeamQuery } from "@midday/supabase/queries";
import { AnimatedSizeContainer } from "@midday/ui/animated-size-container";
import { Button } from "@midday/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@midday/ui/dialog";
import { Icons } from "@midday/ui/icons";
import { useToast } from "@midday/ui/use-toast";
import { stripSpecialCharacters } from "@midday/utils";
import { useEventDetails } from "@trigger.dev/react";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ImportCsvContext,
  type ImportCsvFormData,
  importSchema,
} from "./context";
import { FieldMapping } from "./field-mapping";
import { SelectFile } from "./select-file";

const pages = ["select-file", "confirm-import"] as const;

type Props = {
  currencies: string[];
  defaultCurrency: string;
};

const defaultParams = {
  step: null,
  accountId: null,
  type: null,
};

export function ImportModal({ currencies, defaultCurrency }: Props) {
  const [eventId, setEventId] = useState<string | undefined>();
  const [isImporting, setIsImporting] = useState(false);
  const [fileColumns, setFileColumns] = useState<string[] | null>(null);
  const [firstRows, setFirstRows] = useState<Record<string, string>[] | null>(
    null,
  );

  const [pageNumber, setPageNumber] = useState<number>(0);
  const page = pages[pageNumber];

  const supabase = createClient();
  const { uploadFile } = useUpload();

  const { toast } = useToast();
  const router = useRouter();

  const { data: eventData } = useEventDetails(eventId);

  const status = eventData?.runs.at(-1)?.status;
  const error = status === "FAILURE" || status === "TIMED_OUT";

  const [params, setParams] = useQueryStates({
    step: parseAsString,
    accountId: parseAsString,
    type: parseAsString,
  });

  const isOpen = params.step === "import";

  const importTransactions = useAction(importTransactionsAction, {
    onSuccess: ({ data }) => {
      if (data?.id) {
        setEventId(data.id);
      }
    },
    onError: () => {
      setIsImporting(false);
      setEventId(undefined);
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ImportCsvFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      currency: defaultCurrency,
      bank_account_id: params.accountId ?? undefined,
      inverted: params.type === "credit",
    },
  });

  const file = watch("file");

  useEffect(() => {
    if (params.accountId) {
      setValue("bank_account_id", params.accountId);
    }
  }, [params.accountId]);

  useEffect(() => {
    if (params.type) {
      setValue("inverted", params.type === "credit");
    }
  }, [params.type]);

  useEffect(() => {
    if (error) {
      setIsImporting(false);
      setEventId(undefined);

      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again or contact support.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (status === "SUCCESS") {
      setEventId(undefined);
      setIsImporting(false);
      setParams(defaultParams);
      router.refresh();

      toast({
        duration: 3500,
        variant: "success",
        title: "Transactions imported successfully.",
      });
    }
  }, [status]);

  // Go to second page if file looks good
  useEffect(() => {
    if (file && fileColumns && pageNumber === 0) {
      setPageNumber(1);
    }
  }, [file, fileColumns, pageNumber]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setParams(defaultParams)}>
      <DialogContent>
        <div className="p-4 pb-0">
          <DialogHeader>
            <div className="flex space-x-4 items-center mb-4">
              {!params.accountId && (
                <button
                  type="button"
                  className="items-center border bg-accent p-1"
                  onClick={() => setParams({ step: "connect" })}
                >
                  <Icons.ArrowBack />
                </button>
              )}
              <DialogTitle className="m-0 p-0">
                {page === "select-file" && "Select file"}
                {page === "confirm-import" && "Confirm import"}
              </DialogTitle>
            </div>
            <DialogDescription>
              {page === "select-file" &&
                "Upload a CSV file or a screenshot of your bank statements."}
              {page === "confirm-import" &&
                "We’ve mapped each column to what we believe is correct, but please review the data below to confirm it’s accurate."}
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <AnimatedSizeContainer height>
              <ImportCsvContext.Provider
                value={{
                  fileColumns,
                  setFileColumns,
                  firstRows,
                  setFirstRows,
                  control,
                  watch,
                  setValue,
                }}
              >
                <div>
                  <form
                    className="flex flex-col gap-y-4"
                    onSubmit={handleSubmit(async (data) => {
                      setIsImporting(true);

                      const { data: userData } =
                        await getCurrentUserTeamQuery(supabase);

                      const filename = stripSpecialCharacters(data.file.name);

                      const { path } = await uploadFile({
                        bucket: "vault",
                        path: [userData?.team_id, "imports", filename],
                        file,
                      });

                      importTransactions.execute({
                        filePath: path,
                        currency: data.currency,
                        bankAccountId: data.bank_account_id,
                        currentBalance: data.balance,
                        inverted: data.inverted,
                        mappings: {
                          amount: data.amount,
                          date: data.date,
                          description: data.description,
                        },
                      });
                    })}
                  >
                    {page === "select-file" && <SelectFile />}
                    {page === "confirm-import" && (
                      <>
                        <FieldMapping currencies={currencies} />

                        <Button
                          disabled={!isValid || isImporting}
                          className="mt-4"
                        >
                          {isImporting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Confirm import"
                          )}
                        </Button>

                        <button
                          type="button"
                          className="text-sm mb-4 text-[#878787]"
                          onClick={() => {
                            setPageNumber(0);
                            reset();
                            setFileColumns(null);
                            setFirstRows(null);
                          }}
                        >
                          Choose another file
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </ImportCsvContext.Provider>
            </AnimatedSizeContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
