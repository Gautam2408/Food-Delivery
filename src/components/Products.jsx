import { fetchData } from "../http";
import MealItem from "./MealItem";
import useFetch from "../hooks/useFetch";

export default function Products() {
  const { isLoading, error, data } = useFetch(fetchData, []);

  if (isLoading) {
    return <p className="center">Fetching Meal Items...</p>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error Occured</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul id="meals">
      {data.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
