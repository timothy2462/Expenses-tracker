// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import TransactionsComponent from "./TransactionsComponent";
// import OverviewComponent from "./OverviewComponent";

// const Container = styled.div`
//   background-color: white;
//   color: #0d1d2c;
//   display: flex;
//   flex-direction: column;
//   padding: 10px 22px;
//   font-size: 18px;
//   width: 360px;
//   align-items: center;
//   justify-content: space-between;
// `;

// const HomeComponent = (props) => {
//     const [transactions, updateTransaction] = useState([]);
//     const [expense, updateExpense] = useState(0);
//     const [income, updateIncome] = useState(0);

//     const calculateBalance = () => {
//         let exp = 0;
//         let inc = 0;
//         transactions.map((payload) =>
//             payload.type === "EXPENSE"
//                 ? (exp = exp + payload.amount)
//                 : (inc = inc + payload.amount),
//         );
//         updateExpense(exp);
//         updateIncome(inc);
//     };
//     useEffect(() => calculateBalance(), [transactions]);

//     const addTransaction = (payload) => {
//         const transactionArray = [...transactions];
//         transactionArray.push(payload);
//         updateTransaction(transactionArray);
//     };
//     return (
//         <Container>
//             <OverviewComponent
//                 expense={expense}
//                 income={income}
//                 addTransaction={addTransaction}
//             />
//             {transactions?.length ? (
//                 <TransactionsComponent transactions={transactions} />
//             ) : (
//                 ""
//             )}
//         </Container>
//     );
// };
// export default HomeComponent;


// HomeComponent
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionsComponent from "./TransactionsComponent";
import OverviewComponent from "./OverviewComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const HomeComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  // Load transactions from local storage on component mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  // Update local storage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Calculate balance, expense, and income
  useEffect(() => {
    let totalExpense = 0;
    let totalIncome = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "EXPENSE") {
        totalExpense += transaction.amount;
      } else if (transaction.type === "INCOME") {
        totalIncome += transaction.amount;
      }
    });
    setExpense(totalExpense);
    setIncome(totalIncome);
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <Container>
      <OverviewComponent expense={expense} income={income} addTransaction={addTransaction} />
      {transactions.length > 0 && <TransactionsComponent transactions={transactions} />}
    </Container>
  );
};

export default HomeComponent;
