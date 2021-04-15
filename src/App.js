import React, { useReducer } from "react";
import "./styles.css";

import faker from "faker";

faker.seed(123);

const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

function reducer(state, action) {
  switch (action.type) {
    case "lowtohigh":
      return {
        ...state,
        sort: [...state.sort].sort((a, b) => a.price - b.price)
      };
    case "hightolow":
      return {
        ...state,
        sort: [...state.sort].sort((a, b) => b.price - a.price)
      };
    case "none":
      return { ...state, sort: state.product };
    default:
      return console.log("error");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { product: data, sort: data });
  //console.log(state.sort,state.product);
  return (
    <>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        low to high{" "}
        <input
          type="radio"
          name="l"
          onClick={() => dispatch({ type: "lowtohigh" })}
        />
        high to low{" "}
        <input
          type="radio"
          name="l"
          onClick={() => dispatch({ type: "hightolow" })}
        />
        relevance
        <input
          type="radio"
          name="l"
          onClick={() => dispatch({ type: "none" })}
        />
        {state.sort.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}
