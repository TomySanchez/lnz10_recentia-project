export const ConfiguracionContent = ({ className, title, extra, children }) => {
  return (
    <div className={`ConfiguracionContent ${className}`}>
      <div className='configuracion-content-header'>
        <div className='configuracion-content-title-container'>
          <h1>{title}</h1>
        </div>
        <div className='configuracion-content-extra-container'>{extra}</div>
      </div>
      {children}
    </div>
  );
};
