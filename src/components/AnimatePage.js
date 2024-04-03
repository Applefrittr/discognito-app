import { motion } from "framer-motion";

// Component AnimatePage is a wrapper component which gives a smooth transition when Linking from one component to another
const AnimatePage = ({ children }) => {
  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.section
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 1,
        type: "spring",
      }}
      className="view-container"
    >
      {children}
    </motion.section>
  );
};

export default AnimatePage;
