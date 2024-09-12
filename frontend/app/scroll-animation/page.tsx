'use client';

import { FaArrowRight } from 'react-icons/fa';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function page() {
  return <TextParallaxContentExample />;
}

export default page;

export const TextParallaxContentExample = () => {
  return (
    <div className='bg-white'>
      <TextParallaxContent
        imgUrl='https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        heading='collaborate'
        subheading='Built for all of us'
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl='https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        heading='test'
        subheading=''
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl='https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        heading='test'
        subheading=''
      >
        <ExampleContent />
      </TextParallaxContent>
    </div>
  );
};

type TextParallaxContentProps = {
  imgUrl: string;
  subheading: string;
  heading: string;
  children?: React.ReactNode;
};

const IMG_PADDING = 12;
const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className='relative h-[150vh] '>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      // initial={{ y: 20, opacity: 0 }}
      // animate={{ y: 0, opacity: 1 }}
      // transition={{ ease: 'easeInOut', duration: 0.75 }}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: `calc(100vh - ${IMG_PADDING * 2}px`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className='sticky z-0 overflow-hidden rounded-2xl '
    >
      <motion.div
        style={{ opacity }}
        className='absolute inset-0 bg-neutral-950/70'
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className='absolute left-0 top-0 w-full flex flex-col h-screen items-center justify-center text-white'
    >
      <p className='mb-2 text-center text-xl md:mb-4 md:text-3xl'>{heading}</p>
      <p className='text-center text-4xl font-bold md:text-7xl'>{subheading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12'>
    <h2 className='col-span-1 text-3xl font-bold  md:col-span-4'>
      Lorem ipsum dolor sit amet consectetur.
    </h2>
    <div className='col-span-1 md:col-span-8 '>
      <p className='mb-4 text-neutral-600 md:text-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
        temporibus! Quasi dolor, a repellendus recusandae reprehenderit et minus
        maxime adipisci blanditiis vero architecto fuga veritatis velit
        voluptatum sint iste quae!
      </p>
      <p className='mb-8 text-xl text-neutral-600 md:text-2xl'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore nihil
        mollitia excepturi sint quae laboriosam perferendis distinctio natus!
        Asperiores, eius!
      </p>
      <button
        className='w-full rounded bg-neutral-900 px-9 py-4 
      text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit'
      >
        Learn more <FaArrowRight className='inline' />
      </button>
    </div>
  </div>
);
