import { useRef, useState } from "react";
import "./App.css";

const items = [
  { name: "Hamburger", price: 15.99, description: "A deliecious burger." },
  { name: "Pizza", price: 11.99, description: "A deliecious pizza." },
  { name: "Pho", price: 15.99, description: "A deliecious Pho." },
];

function ItemCard(props) {
  const [QTY, setQTY] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const handleAdd = (quantity) => {
    setItemCount(itemCount + 1);
    setQTY(quantity);
    props.onAddItem((currentItems) => {
      return [...currentItems, { itemCount, ...props.item, QTY }];
    });
  };
  return (
    <div className="item-card">
      <Item item={props.item} />
      <QuantityOrder onAdd={handleAdd} />
    </div>
  );
}

function ItemCards(props) {
  const [completeOrder, setCompleteOrder] = useState([]);
  return (
    <div className="container">
      {completeOrder}
      {items.map((item, index) => {
        return (
          <ItemCard key={index} item={item} onAddItem={setCompleteOrder} />
        );
      })}
    </div>
  );
}

function QuantityOrder(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAdd(event.target.quantity.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="quantity" id="quantity">
          <option value="qty">qty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function Item(props) {
  return (
    <div>
      <div>{props.item.name}</div>
      <div>{props.item.price}</div>
      <div>{props.item.description}</div>
    </div>
  );
}

function App() {
  const reffy = useRef(null);
  console.log(reffy);
  return (
    <div>
      hello
      <ItemCards />
    </div>
  );
}

export default App;
