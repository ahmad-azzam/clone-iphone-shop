import {
  Features,
  Hero,
  Highlights,
  HowItWorks,
  Model,
} from "@/components/section/home";

const Home = () => {
  return (
    <div>
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
    </div>
  );
};

export default Home;
