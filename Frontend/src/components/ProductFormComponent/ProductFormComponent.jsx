import { useState } from "react";

export default function ProductFormComponent(props) {
  /*   const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const hadnleInputOne = (e) => {
    setInputOne(e.target.value);
    console.log(inputOne);
  };

  const hadnleInputTwo = (e) => {
    setInputTwo(e.target.value);
    console.log(inputTwo);
  }; */
  return (
    <form>
      <label>Hello write here</label>
      <input
        type="text"
        placeholder="..."
        /*  onChange={hadnleInputOne} */
        value={props.val1}
      />
      <br />
      <br />
      <label>Hello write here</label>
      <input
        type="text"
        placeholder="..."
        /*  onChange={hadnleInputTwo} */
        value={props.val2}
      />
    </form>
  );
}
