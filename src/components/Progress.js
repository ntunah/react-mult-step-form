import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Progress = ({ location: { pathname } }) => {
  const isFirstStep = pathname === '/';
  const isSecondStep = pathname === '/second';
  const isThirdStep = pathname === '/third';

  return (
    <React.Fragment>
      <motion.div  
      initial={{ y: '-100vw' }}
      animate={{ y: 0 }} 
      className="steps">
        <div className={isFirstStep ? 'step active' : 'step '}>
          <div>1</div>
          <div>
            {isSecondStep || isThirdStep ? (
              <Link to="/">Personal</Link>
            ) : (
              'Personal'
            )}
          </div>
        </div>
        <div className={isSecondStep ? 'step active' : 'step'}>
          <div>2</div>
          <div>{isThirdStep ? <Link to="/second">Login</Link> : 'Login'}</div>
        </div>
        <div className={pathname === '/third' ? 'step active' : 'step '}>
          <div>3</div>
          <div>Location</div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};
export default withRouter(Progress);
