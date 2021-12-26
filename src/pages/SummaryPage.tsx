import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import { Item } from "../store/firebase";
import displayCurrency from "../utils/displayCurrency";

const statusConfig = {
  default: {
    bg: "bg-white",
    fg: "text-black",
    text: "",
  },
  good: {
    bg: "bg-emerald-100",
    fg: "text-emerald-800",
    text: "You are within your budget!",
  },
  warning: {
    bg: "bg-amber-100",
    fg: "text-amber-800",
    text: "You may go over budget.",
  },
  bad: {
    bg: "bg-red-100",
    fg: "text-red-800",
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

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const budgetClean = budget.replaceAll(",", "");
    // const budgetNum = parseFloat(budgetClean);
    // if (!isNaN(budgetNum)) {
    //   props.setBudget(budgetNum);
    //   navigate("/items");
    // }
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
    <form
      onSubmit={handleFormSubmit}
      className={`mx-auto min-h-screen flex flex-col justify-center items-center text-left ${statusConfig[status].bg}`}
    >
      <div>
        <h1
          className={`text-center font-extrabold text-3xl mb-8 ${statusConfig[status].fg}`}
        >
          {statusConfig[status].text}
        </h1>
        <div>
          <span className="uppercase font-extrabold">Your budget:&nbsp;</span>
          <span>{displayCurrency(budget)}</span>
        </div>
        <div>
          <span className="uppercase font-extrabold">
            Estimated Cost:&nbsp;
          </span>
          <span>
            {priceRange.low === priceRange.high
              ? `${displayCurrency(priceRange.low)}`
              : `${displayCurrency(priceRange.low)} - ${displayCurrency(
                  priceRange.high
                )}`}
          </span>
        </div>
        {/* <div className="uppercase text-2xl font-extrabold">What's your</div>
        <div className="uppercase text-6xl font-extrabold">Budget?</div>
        <div className="my-6 flex">
          <span className="text-2xl mr-2 text-gray-200 flex-grow-0 font-extrabold">
            $
          </span>
          <input
            type="text"
            name="budget"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="border-b-2 text-right text-2xl w-40 grow"
            autoFocus
            maxLength={10}
            pattern={"[0-9,]+.?[0-9]+"}
            required
            placeholder="50,000"
          />
        </div>
        <Button className="px-8 py-4 mt-12">Begin</Button> */}
      </div>
    </form>
  );
}

export default SummaryPage;
