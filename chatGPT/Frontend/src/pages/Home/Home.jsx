import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [input, setInput] = useState("");


  const submitHandeler = ()=>{
    console.log(input);
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>ChatGPT</span>
          </div>

          <nav className="menu">
            <button className="menu-item new-chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>New chat</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">AK</div>
            <div className="user-info">
              <div className="name">Akash Mukherjee</div>
              <div className="plan">
                <span className="plan-badge">Free</span>
              </div>
            </div>
            <button className="more-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="19" r="1.5" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}

      {/* Main Section */}
      <main className="main">
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="header-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nova AI
          </div>
        </header>

        <section className="content">
          <div className="welcome-section">
            <div className="welcome-icon">👋</div>
            <h1>Good to see you, Akash.</h1>
            <p className="subtitle">How can I help you today?</p>
          </div>

          {/* MAIN INPUT P */}
          <div className="input-container">
            <div className="input-box">
              <button className="attach-btn" aria-label="Attach file">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <input onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Message Nova Ai" />
              <button onClick={()=>submitHandeler()} className="mic-btn" aria-label="Voice input">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="input-hint">Nova Ai can make mistakes. Check important info.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;