import Layout from "../components/Main/Layout";
import Header from "../components/shared/Header";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/shared/Footer";
import TrendingSessions from "../components/Landing/TrendingSessions"
import Stats from "../components/Landing/Stats";
const Home = () => {
  return (
    <Layout title="uvsity | Educational Social Network">
      <Header />
      <Hero />
      <Feature/>
      <TrendingSessions />
      <Stats/>
      <Footer />
    </Layout>
  );
};
export default Home;
