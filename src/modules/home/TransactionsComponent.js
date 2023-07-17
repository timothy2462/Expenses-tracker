import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri"; // Import the delete icon from react-icons library

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;

const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const DeleteIcon = styled(RiDeleteBin5Line)`
  cursor: pointer;
`;

const TransactionsComponent = ({ transactions, deleteTransaction }) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(transactions);
      return;
    }
    const txn = transactions.filter(
      (payload) =>
        payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn);
  };

  useEffect(() => {
    filterData(searchText);
  }, [transactions, searchText]);

  const handleDeleteTransaction = (transactionId) => {
    deleteTransaction(transactionId); // Call the deleteTransaction function passed from HomeComponent
  };

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction?.map((payload) => (
        <Cell isExpense={payload.type === "EXPENSE"} key={payload.id}>
          <span>{payload.desc}</span>
          <span>
            <span>&#8358;</span>
            {payload.amount}
          </span>
          <DeleteIcon onClick={() => handleDeleteTransaction(payload.id)} />
        </Cell>
      ))}
    </Container>
  );
};

export default TransactionsComponent;
