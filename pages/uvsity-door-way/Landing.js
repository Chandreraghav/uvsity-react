import Layout from '../../components/Main/Layout'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import Dashboard from '../../components/Authorized/Dashboard';
const Landing = () => {
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_TITLE}`}>
      <Header isAuthorized={true} isShared={true}/>
      <Dashboard isAuthorized={true} isShared={false}/>
      <Footer isAuthorized={true}/>
    </Layout>
  );
};
export default Landing;
