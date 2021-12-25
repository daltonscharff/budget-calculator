import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
};

function BudgetInputPage(props: Props) {
  const [budget, setBudget] = useState(
    props.budget === 0 ? "" : props.budget.toString()
  );
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const budgetInt = parseInt(budget, 10);
    if (!isNaN(budgetInt)) {
      props.setBudget(budgetInt);
      navigate("/items");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto min-h-screen flex flex-col justify-center items-center text-left"
    >
      <div>
        <div className="uppercase text-2xl font-extrabold">What is your</div>
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
            pattern={"[0-9]+"}
            required
            placeholder="50000"
          />
        </div>
        <input
          type="submit"
          value="Begin"
          className="w-full text-center font-bold text-white bg-emerald-600 rounded-full px-8 py-4 mt-12 cursor-pointer"
        />
      </div>
    </form>
  );
}

export default BudgetInputPage;
