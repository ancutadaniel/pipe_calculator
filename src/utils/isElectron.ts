const isElectron = (): boolean => {
    return typeof window !== 'undefined' && window.process && window.process.type === 'renderer';
  };
  
  export default isElectron;
  