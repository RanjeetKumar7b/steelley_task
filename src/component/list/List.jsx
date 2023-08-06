import React from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import styles from "./List.module.css";
const List = ({ rows, searchText, orderDetails, handleOrderDetails, currency }) => {
  const data_filter = searchText === '' ? rows : rows.filter((row) => row["&id"] === searchText);
  const handleClick = (selectedId) => {
    console.log("Row clicked with ID:", selectedId);
    handleOrderDetails(selectedId);
  };
  
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {`${currency}`}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {data_filter.map((row) => (
          <ListRow key={row["&id"]} onClick={() => handleClick(row["&id"])}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{orderDetails.find((order) => order["&id"] === row["&id"]).timestamps.orderSubmitted}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
