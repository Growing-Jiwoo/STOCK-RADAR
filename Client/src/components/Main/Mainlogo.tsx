import { ReactComponent as TitleLogo } from '../../assets/icons/titleLogo.svg';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export function MainLogo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const imgVariants: Variants = {
    hidden: {
      opacity: 1,
      y: 15,
    },
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 1.3,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    }),
  };

  const mentVariants: Variants = {
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    }),
  };

  return (
    <>
      <motion.div
        animate={isVisible ? 'visible' : 'hidden'}
        variants={imgVariants}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <TitleLogo />
      </motion.div>

      <motion.div
        animate={isVisible ? 'visible' : 'hidden'}
        variants={mentVariants}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <br />
        <span>▲ click here ▲</span>
      </motion.div>
    </>
  );
}
