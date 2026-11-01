const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function formatCurrency(amount = 0) {
  return currencyFormatter.format(amount);
}
