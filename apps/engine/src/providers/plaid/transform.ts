import { Providers } from "@/common/schema";
import { getType } from "@/utils/account";
import { getLogoURL } from "@/utils/logo";
import { capitalCase } from "change-case";
import type { Transaction, TransactionCode } from "plaid";
import type {
  Account as BaseAccount,
  Balance as BaseBalance,
  Transaction as BaseTransaction,
} from "../types";
import type {
  TransformAccount,
  TransformAccountBalance,
  TransformInstitution,
  TransformTransactionPayload,
} from "./types";

export const mapTransactionMethod = (type?: TransactionCode | null) => {
  switch (type) {
    case "bill payment":
      return "payment";
    case "purchase":
      return "card_purchase";
    case "atm":
      return "card_atm";
    case "transfer":
      return "transfer";
    case "interest":
      return "interest";
    case "bank charge":
      return "fee";
    default:
      return "other";
  }
};

type MapTransactionCategory = {
  transaction: Transaction;
  amount: number;
};

export const mapTransactionCategory = ({
  transaction,
  amount,
}: MapTransactionCategory) => {
  if (transaction.personal_finance_category?.primary === "INCOME") {
    return "income";
  }

  if (
    transaction.transaction_code === "transfer" ||
    transaction.personal_finance_category?.primary === "TRANSFER_IN" ||
    transaction.personal_finance_category?.primary === "TRANSFER_OUT"
  ) {
    return "transfer";
  }

  if (amount > 0) {
    return "income";
  }

  if (
    transaction.transaction_code === "bank charge" ||
    transaction.personal_finance_category?.primary === "BANK_FEES"
  ) {
    return "fees";
  }

  if (transaction.personal_finance_category?.primary === "FOOD_AND_DRINK") {
    return "meals";
  }

  if (
    transaction.personal_finance_category?.primary === "TRANSPORTATION" ||
    transaction.personal_finance_category?.primary === "TRAVEL"
  ) {
    return "travel";
  }

  if (
    transaction.personal_finance_category?.detailed ===
    "GENERAL_SERVICES_OTHER_GENERAL_SERVICES"
  ) {
    return "software";
  }

  if (
    transaction.personal_finance_category?.detailed ===
      "RENT_AND_UTILITIES_GAS_AND_ELECTRICITY" ||
    transaction.personal_finance_category?.detailed ===
      "RENT_AND_UTILITIES_SEWAGE_AND_WASTE_MANAGEMENT" ||
    transaction.personal_finance_category?.detailed ===
      "RENT_AND_UTILITIES_WATER" ||
    transaction.personal_finance_category?.detailed ===
      "RENT_AND_UTILITIES_OTHER_UTILITIES"
  ) {
    return "facilities-expenses";
  }

  if (
    transaction.personal_finance_category?.detailed ===
    "RENT_AND_UTILITIES_RENT"
  ) {
    return "rent";
  }

  if (
    transaction.personal_finance_category?.detailed ===
      "RENT_AND_UTILITIES_INTERNET_AND_CABLE" ||
    transaction.personal_finance_category?.detailed ===
      "RENT_AND_UTILITIES_TELEPHONE"
  ) {
    return "internet-and-telephone";
  }

  if (transaction.personal_finance_category?.primary === "HOME_IMPROVEMENT") {
    return "office-supplies";
  }

  if (transaction.personal_finance_category?.primary === "ENTERTAINMENT") {
    return "activity";
  }

  return null;
};

const formatAmout = (amount: number) => {
  // Positive values when money moves out of the account; negative values when money moves in.
  // For example, debit card purchases are positive; credit card payments, direct deposits, and refunds are negative.
  return +(amount * -1);
};

const transformDescription = (transaction: Transaction) => {
  const name = capitalCase(transaction.name);

  if (
    transaction?.original_description &&
    transaction.original_description !== name
  ) {
    return capitalCase(transaction.original_description);
  }

  if (transaction?.merchant_name && transaction?.merchant_name !== name) {
    return transaction?.merchant_name;
  }

  return null;
};

export const transformTransaction = ({
  transaction,
}: TransformTransactionPayload): BaseTransaction => {
  const method = mapTransactionMethod(transaction?.transaction_code);
  const amount = formatAmout(transaction.amount);
  const description = transformDescription(transaction) ?? null;

  return {
    id: transaction.transaction_id,
    date: transaction.date,
    name: transaction.name,
    description,
    currency_rate: null,
    currency_source: null,
    method,
    amount,
    currency:
      transaction.iso_currency_code ||
      transaction.unofficial_currency_code ||
      "USD",
    category: mapTransactionCategory({ transaction, amount }),
    balance: null,
    status: transaction.pending ? "pending" : "posted",
  };
};

export const transformAccount = ({
  account_id,
  name,
  balances,
  institution,
  type,
}: TransformAccount): BaseAccount => {
  return {
    id: account_id,
    name,
    currency:
      balances.iso_currency_code || balances.unofficial_currency_code || "USD",
    type: getType(type),
    enrollment_id: null,
    balance: transformAccountBalance(balances),
    institution: {
      id: institution.id,
      name: institution.name,
      logo: getLogoURL(institution.id),
      provider: Providers.Enum.plaid,
    },
  };
};

export const transformAccountBalance = (
  balances?: TransformAccountBalance,
): BaseBalance => ({
  currency:
    balances?.iso_currency_code || balances?.unofficial_currency_code || "USD",
  amount: balances?.available ?? 0,
});

export const transformInstitution = (institution: TransformInstitution) => ({
  id: institution.institution_id,
  name: institution.name,
  logo: getLogoURL(institution.institution_id),
  provider: Providers.Enum.plaid,
});
