import Layout from "../components/Main/Layout";
import Header from "../components/shared/Header";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/shared/Footer";
import TrendingSessions from "../components/Landing/TrendingSessions"
import Stats from "../components/Landing/Stats";
const Home = () => {
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_TITLE}`}>
      <Header isAuthorized={false} isShared={true} />
      <Hero isAuthorized={false} isShared={false} />
      <Feature isAuthorized={false} isShared={false}/>
      <TrendingSessions isAuthorized={false} isShared={false} />
      {/* Stats will be replaced by About us section in the future */}
      <Stats isAuthorized={false} isShared={false}/>
      <Footer isAuthorized={false} isShared={true} />
    </Layout>
  );
};
export default Home;
