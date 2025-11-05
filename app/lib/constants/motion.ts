export const drawerVariants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' }
}

export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.2 }
  }
}

export const searchBoxVariants: any = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}
