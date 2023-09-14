// import './App.css';

import styled from "styled-components";
import Demo from "./components/Demo";
import Hero from "./components/Hero";

function App() {
  return (
    <Main>
      <div className="main">
        <div className="">
          <div className="">
            <Hero/>
            <Demo/>
          </div>
        </div>
      </div>
    </Main>
  );
}
const Main = styled.main`

`;

export default App;
