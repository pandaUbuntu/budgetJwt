import Footer from "../../components/Footer";
import Header from "../../components/Header";

type PageLayoutProps = {
    children: React.ReactNode;
  };
  
  const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
      <div className="wrapper">
        <Header />
            <div className="content">
                {children}
            </div>  
        <Footer />
      </div>
    );
  };
  

  export default PageLayout
  