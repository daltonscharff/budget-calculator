import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Statistic from "../components/Statistic";
import {
  getBudgetResponses,
  Item,
  postBudgetResponse,
} from "../store/firebase";
import displayCurrency from "../utils/displayCurrency";

const statusConfig = {
  default: {
    colors: {
      bg: "bg-white",
      fg: "text-black",
      button: "",
    },
    text: "",
  },
  good: {
    colors: {
      bg: "bg-emerald-50",
      fg: "text-emerald-800",
      button: "bg-emerald-800",
    },
    text: "You are within your budget!",
  },
  warning: {
    colors: {
      bg: "bg-amber-50",
      fg: "text-amber-800",
      button: "bg-amber-800",
    },
    text: "You may go over budget.",
  },
  bad: {
    colors: {
      bg: "bg-red-50",
      fg: "text-red-800",
      button: "bg-red-800",
    },
    text: "You are over budget!",
  },
};

type Status = keyof typeof statusConfig;

type Props = {
  budget: number;
  priceRange: { low: number; high: number };
  selectedItems: Map<string, Item>;
};

function SummaryPage({ budget, priceRange, selectedItems }: Props) {
  const [status, setStatus] = useState("default" as Status);
  const [buttonText, setButtonText] = useState("Submit");

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonText("Submitted");
    await postBudgetResponse({
      budget,
      items: Array.from(selectedItems.values()),
    });
    // prints budgetResponses to see that value updated
    console.log(await getBudgetResponses());
  };

  useEffect(() => {
    if (budget > priceRange.high) {
      setStatus("good");
    } else if (budget > priceRange.low) {
      setStatus("warning");
    } else {
      setStatus("bad");
    }
  }, [budget, priceRange]);

  return (
    <Layout
      className={`min-h-screen flex flex-col justify-center items-center ${statusConfig[status].colors.bg}`}
    >
      <form onSubmit={handleFormSubmit}>
        <div>
          <h1
            className={`text-center font-extrabold text-3xl mb-8 ${statusConfig[status].colors.fg}`}
          >
            {statusConfig[status].text}
          </h1>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            <Statistic label="Estimated Cost">
              {priceRange.low === priceRange.high
                ? `${displayCurrency(priceRange.low)}`
                : `${displayCurrency(priceRange.low)} - ${displayCurrency(
                    priceRange.high
                  )}`}
            </Statistic>
            <Statistic label="Your Budget">{displayCurrency(budget)}</Statistic>
          </div>
          <Button
            disabled={buttonText == "Submitted"}
            className={`px-8 py-4 mt-8 ${statusConfig[status].colors.button}`}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </Layout>
  );
}

export default SummaryPage;
