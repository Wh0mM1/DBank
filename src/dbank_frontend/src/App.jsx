import { useState } from "react";
import { dbank_backend } from "../../declarations/dbank_backend";

let currentAmount;

window.addEventListener("load", async function () {
  update();
  console.log(currentAmount);
});

document
  // .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");

    button.setAttribute("disabled", true);

    const inputAmount = parseFloat(
      document.getElementById("input-amount").value
    );
    if (inputAmount > 0) await dbank_backend.topUp(inputAmount);

    const outputAmount = parseFloat(
      document.getElementById("withdrawal-amount").value
    );
    if (outputAmount > 0) await dbank_backend.bottomDown(outputAmount);

    dbank_backend.compound();

    update();
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    button.removeAttribute("disabled");
    console.log("Submitted");
  });

async function update() {
  currentAmount = await dbank_backend.checkValue();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
}

function App() {
  return (
    <main>
      <div className="container">
        <img src="dbank_logo.png" alt="DBank logo" width="100" />
        <h1>
          Current Balance: $<span id="value"></span>
        </h1>
        <div className="divider"></div>
        <form action="#">
          <h2>Amount to Top Up</h2>
          <input
            id="input-amount"
            type="number"
            step="0.01"
            min="0"
            name="topUp"
            // value=""
          />
          <h2>Amount to Withdraw</h2>
          <input
            id="withdrawal-amount"
            type="number"
            name="withdraw"
            step="0.01"
            min="0"
            // value=""
          />
          <input id="submit-btn" type="submit" value="Finalise Transaction" />
        </form>
      </div>
    </main>
  );
}

export default App;
