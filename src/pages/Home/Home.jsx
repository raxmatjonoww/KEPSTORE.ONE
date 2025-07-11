import { Element } from "react-scroll";
import Main1 from "./Main1/Main1";
import Main2 from "./Main2/Main2";
import Main3 from "./Main3/Main3";
import Main4 from "./Main4/Main4";

function Home() {
  return (
    <div className="home-wrapper">
      <Element name="glavnoe"><Main1 /></Element>
      <Element name="onas"><Main2 /></Element>
      <Element name="faq"><Main3 /></Element>
      <Element name="kontakt"><Main4 /></Element>
    </div>
  );
}

export default Home;