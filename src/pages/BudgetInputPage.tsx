import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

type Props = {
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
};

function BudgetInputPage(props: Props) {
  const [budget, setBudget] = useState(
    props.budget === 0 ? "" : (props.budget / 100).toString()
  );
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const budgetClean = budget.replaceAll(",", "");
    let budgetNum = parseFloat(budgetClean);
    if (!isNaN(budgetNum)) {
      budgetNum = Math.round(budgetNum * 100);
      props.setBudget(budgetNum);
      navigate("/items");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto min-h-screen flex flex-col justify-center items-center text-left"
    >
      <div>
        <div className="uppercase text-2xl font-extrabold">What's your</div>
        <div className="uppercase text-6xl font-extrabold">Budget?</div>
        <div className="my-6 flex border-b-2">
          <span className="text-2xl mr-2 text-gray-200 flex-grow-0 font-extrabold">
            $
          </span>
          <input
            type="text"
            name="budget"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="text-right text-2xl w-40 grow focus:outline-none"
            autoFocus
            maxLength={10}
            pattern={"[0-9,]+.?[0-9]+"}
            required
            placeholder="50,000"
          />
        </div>
        <Button className="px-8 py-4 mt-12">Begin</Button>
      </div>
    </form>
  );
}

export default BudgetInputPage;
