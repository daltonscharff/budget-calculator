import { FormEvent, useState } from "react";

type Props = {
  setBudget: React.Dispatch<React.SetStateAction<number>>;
};

function BudgetInput(props: Props) {
  const [budget, setBudget] = useState("");

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const budgetInt = parseInt(budget, 10);
    props.setBudget(budgetInt);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="number"
        name="budget"
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
      />
    </form>
  );
}

export default BudgetInput;
