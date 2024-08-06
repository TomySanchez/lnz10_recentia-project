export const MainContent = ({ title, icon, extra, children }) => {
  return (
    <div className='MainContent'>
      <div className='main-content-header'>
        <div className='main-content-title-container'>
          <span>{icon}</span>
          <h2>{title}</h2>
        </div>
        <div className='main-content-extra-container'>{extra}</div>
      </div>
      {children}
    </div>
  );
};
