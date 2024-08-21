export const MobileContent = ({ title, icon, children }) => {
  return (
    <div className='MobileContent'>
      <div className='mobile-content-header'>
        <div className='mobile-content-title-container'>
          <span>{icon}</span>
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </div>
  );
};
