'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4"
        >
          나에게 맞는 취미를 찾아보세요
        </motion.h1>
      </div>
    </section>
  );
}

