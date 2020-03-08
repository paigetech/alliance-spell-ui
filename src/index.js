import React, { useContext, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// Using this article to try and figure out useReducer and userContext to pass props up and down
// https://dev.to/email2vimalraj/react-hooks-lift-up--pass-down-state-using-usecontext-and-usereducer-5ai0
// https://codesandbox.io/s/pw5zlq8zj0?fontsize=14
const initialSpellArray = [4, 4, 4, 3, 2, 1];
const SpellArrayContext = React.createContext(null);

function spellArrayReducer(state, action) {
  console.log("UPDATE SPELL ARRAY!", state, action);
}

function Pyramid() {
  const [spellArray, reducer] = useReducer(
    spellArrayReducer,
    initialSpellArray
  );

  const spellDisplayOrder = spellArray.reduce((ary, ele) => {
    ary.unshift(ele);
    return ary;
  }, []);
  const layers = spellDisplayOrder.map((numCheckedBoxes, layerNumber) => {
    return generateLayer(numCheckedBoxes, layerNumber);
  });

  return (
    <SpellArrayContext.Provider value={{ spellArray, reducer }}>
      {layers}
    </SpellArrayContext.Provider>
  );
}

function Checkbox(props) {
  // TODO: Changing the checked value of the box is currently broken
  const { reducer } = useContext(SpellArrayContext);
  const [checked, setChecked] = useState(props.checked);

  return (
    <input
      type="checkbox"
      onClick={() => {
        reducer("blah");
      }}
      checked={checked}
    />
  );
}

function Layer(props) {
  // set key to index
  return <p id={props.layerNumber}>{props.children}</p>;
}

function generateLayer(numCheckedBoxes, layerNumber) {
  let checkboxes = [];
  // set key to index-val
  for (let i = 0; i < numCheckedBoxes; i++) {
    let key = layerNumber.toString() + i.toString();
    checkboxes.push(<Checkbox key={key} checked={true} />);
  }

  // only use this if adding to that row would be a valid build
  // also update the value in the the spellArray
  checkboxes.push(<Checkbox key={`empty-${layerNumber}`} />);

  return (
    <Layer key={layerNumber} layerNumber={layerNumber}>
      {checkboxes}
    </Layer>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Spell Pyramid Builder</h1>
      <Pyramid />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
