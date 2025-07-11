import Main1 from "./Main1/Main1";
import Main2 from "./Main2/Main2";
import Main3 from "./Main3/Main3";
import Main4 from "./Main4/Main4";

function Home() {
  return (
    <div className="home-wrapper">
      <section id="glavnoe"><Main1 /></section>
      <section id="onas"><Main2 /></section>
      <section id="faq"><Main3 /></section>
      <section id="kontakt"><Main4 /></section>
    </div>
  );
}

export default Home;
