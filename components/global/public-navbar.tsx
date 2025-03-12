'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Earth, Menu, X } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { ColourfulText } from '../ui/colourful-text';
import { FaceIcon } from '@radix-ui/react-icons';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <motion.nav
      animate={{
        width: isMenuOpen
          ? '100%'
          : !isMobile
            ? isScrolled
              ? windowWidth <= 1280
                ? '80%'
                : '45%'
              : '91.666667%'
            : '100%',
        marginTop: !isMobile ? (isScrolled ? '1rem' : '0') : '0',
        boxShadow: !isMobile
          ? isScrolled
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            : 'none'
          : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        backgroundColor: isMenuOpen
          ? 'var(--menu-bg)'
          : !isMobile
            ? isScrolled
              ? 'var(--nav-bg-scrolled)'
              : 'transparent'
            : 'var(--nav-bg-mobile)',
      }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
      }}
      className={`fixed top-0 left-1/2 max-w-6xl -translate-x-1/2 ${!isMobile ? 'rounded-full' : ''} z-50 ${isMenuOpen ? 'h-screen w-full bg-background/80 dark:bg-background/95' : ''} ${isScrolled ? 'backdrop-blur-lg' : ''}`}
      style={
        {
          '--menu-bg': 'var(--background, rgba(255, 255, 255, 0.95))',
          '--nav-bg-scrolled': 'var(--background, rgba(255, 255, 255, 0.8))',
          '--nav-bg-mobile': 'var(--background, rgba(255, 255, 255, 0.9))',
        } as React.CSSProperties
      }
    >
      <div className='flex items-center justify-between p-2'>
        <a href='#'>
          <div className='flex items-center'>
            <div className='px-2 ml-2'>
              {/* <Code2 className='w-7 h-7 text-primary' /> */}
              <Image
                alt=''
                src={'/dev.svg'}
                width={100}
                height={100}
                className='w-7 h-7 text-primary'
              />
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isScrolled ? 0 : 1,
                scale: isScrolled ? 0.8 : 1,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
              className='ms-1 mt-1 text-[1.2rem] font-semibold text-primary'
            >
              NeihTdev
            </motion.span>
          </div>
        </a>
        <ul className='hidden space-x-10 md:flex'>
          {['overview', 'features', 'contributors'].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              <a
                href={`#${item}`}
                className='font-semibold text-gray-700 transition-colors hover:text-primary dark:text-gray-200 dark:hover:text-primary'
              >
                {item === 'overview' ? 'Tổng quan' : item === 'features' ? 'Tính năng' : 'Đóng góp'}
              </a>
            </motion.li>
          ))}
        </ul>
        <div className='flex items-center space-x-2'>
          <div className='min-w-[100px] text-end'>
            <ModeToggle />
          </div>
          <div className='py-5'></div>
          <button className='z-50 pr-2 md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X size={24} onClick={() => setIsMenuOpen(false)} />
            ) : (
              <Menu size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className='fixed inset-0 left-0 top-0 z-40 h-full w-full bg-background/80 pt-16 backdrop-blur-sm dark:bg-background/95 md:hidden'>
          <ul className='flex flex-col items-center space-y-8 pt-8'>
            <li>
              <a
                href='#overview'
                className='text-xl font-semibold text-gray-700 dark:text-foreground'
                onClick={() => setIsMenuOpen(false)}
              >
                Tổng quan
              </a>
            </li>
            <li>
              <a
                href='#features'
                className='text-xl font-semibold text-gray-700 dark:text-foreground'
                onClick={() => setIsMenuOpen(false)}
              >
                Tính năng
              </a>
            </li>
            <li>
              <a
                href='#contributors'
                className='text-xl font-semibold text-gray-700 dark:text-foreground'
                onClick={() => setIsMenuOpen(false)}
              >
                Đóng góp
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
}
