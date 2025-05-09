const Header: React.FC = () => {
    return (
        <header className="header">
          <div className="header__content">
            <h1>Welcome to Our Website</h1>
            <nav className="header__nav">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
              </ul>
            </nav>
          </div>
        </header>
    );
  };
  
  export default Header
  