import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";

const stripePromise = loadStripe(
  "pk_test_51IeCXhIbU0BILRiyqXycjhNhDYv5MlpSHgECNiMb8yaN9yiWJOwqmdE7z55U35RWs9jdqpiKEFGKpheM6K5n9AOZ00DJ9SzQkU"
);
const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
