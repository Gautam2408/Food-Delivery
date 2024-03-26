export async function fetchData() {
  const response = await fetch("http://localhost:3000/meals");

  if (!response.ok) {
    throw new Error("Not able to load food");
  }

  const resData = await response.json();

  return resData;
}

export async function updateOrderData(order) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Not able to customer order");
  }

  const resData = await response.json();

  return resData.message;
}
