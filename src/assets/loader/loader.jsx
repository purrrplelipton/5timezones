import React from 'react';
import { inner, outer } from './loader.module.css';

function Loader() {
  return (
    <span className={outer}>
      <span className={inner} />
      <span className={inner} />
    </span>
  );
}

export default Loader;
