import React from 'react';
import Progress from './Progress';
import { motion } from 'framer-motion';

const Header = () => (
  <motion.div initial={{ y: '-100vw' }} animate={{ y: 0 }} style={{
    backgroundColor: "blue",
    padding: 30
  }}>
    <h1>Registration</h1>
    <Progress />
  </motion.div>
);

export default Header;
