export const MobileContent = ({ title, icon, children, isWip }) => {
  return (
    <div className='MobileContent'>
      <div className='mobile-content-header'>
        <div className='mobile-content-title-container'>
          <span>{icon}</span>
          <h2>{title}</h2>
        </div>
      </div>
      {isWip ? (
        <div className='work-in-progress'>
          <p>Work in Progress</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
