import React from "react";
import { Link } from "react-router-dom";
const Inventory = () => {
  return (
    <div>
      <Link to={"/inventory/add-product"}>Add Product</Link>
    </div>
  );
};

export default Inventory;
