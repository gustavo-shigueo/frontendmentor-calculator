import type { Component } from "solid-js";
import { ThemePicker } from "./components/ThemePicker";
import { Calculator } from "./components/Calculator";

const App: Component = () => {
  return (
    <>
      <main>
        <header>
          <h1>calc</h1>

          <ThemePicker />
        </header>

        <Calculator />
      </main>

      <footer class="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/gustavo-shigueo" target="_blank">
          Gustavo Shigueo
        </a>
        .
      </footer>
    </>
  );
};

export default App;
