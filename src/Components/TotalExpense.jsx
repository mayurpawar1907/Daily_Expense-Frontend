import { useEffect, useState } from "react";
import axios from "axios";

function TotalExpense() {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/total-expense") 
      .then(response => setTotalExpense(response.data.total_expense))
      .catch(error => console.error("Error fetching total expense:", error));
  }, []);

  return (
    <div>
      <h2>Total Expense for Today: ₹{totalExpense}</h2>
    </div>
  );
}

export default TotalExpense;
