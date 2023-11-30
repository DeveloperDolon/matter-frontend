'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/1.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/2.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/3.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/4.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/5.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/6.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/7.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/8.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/9.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/10.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/11.jpg",
  "https://raw.githubusercontent.com/olivierlarose/smooth-parallax-scroll/master/public/images/12.jpg",
]

export default function AnimationPage() {
  
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y}/>
        <Column images={[images[3], images[4], images[5]]} y={y2}/>
        <Column images={[images[6], images[7], images[8]]} y={y3}/>
        <Column images={[images[9], images[10], images[11]]} y={y4}/>
      </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({images, y}) => {
  return (
    <motion.div 
      className={styles.column}
      style={{y}}
      >
      {
        images?.map( (src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <img 
              src={src}
              alt='image'
            />
          </div>
        })
      }
    </motion.div>
  )
}