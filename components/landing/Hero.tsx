import Image from 'next/image';
import React from 'react';
import { Spotlight } from '../ui/Spotlight';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import { HeroHighlight } from '../ui/hero-highlight';
import { MagicCard } from '../ui/magic-card';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

export default function Hero() {
  return (
    <div>
      <Spotlight className='-left-14 -top-24 h-screen md:-left-12' fill='white' />
      <Spotlight className='left-28 top-12 h-[65vh] w-[50vw]' fill='#fdba74' />
      <Spotlight className='-left-4 top-2 h-[75vh] w-[70vw]' fill='#fda343' />
      <HeroHighlight>
        <section className='relative grid min-h-screen mx-auto max-w-[85rem] grid-cols-3 place-items-center px-4 '>
          <div className='col-span-3 md:col-span-1'>
            <CardContainer
              containerClassName='py-0 sm:py-20'
              className='inter-var w-full col-span-3'
            >
              <CardBody className='bg-transparent relative group/card w-full h-auto rounded-xl '>
                <CardItem
                  translateZ='80'
                  rotateX={-10}
                  className='text-xl flex justify-start font-bold text-neutral-600 dark:text-white --w-auto sm:w-[30rem]'
                >
                  <Image
                    priority
                    src={'/assets/boy.webp'}
                    width={300}
                    height={300}
                    alt='CVS'
                    className='h-full w-full max-w-[400px]'
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          <div className=' z-10 col-span-3 select-none space-y-2 text-start max-sm:px-1 md:col-span-2 md:text-start'>
            <TextGenerateEffect
              className='w-full break-words font-extrabold text-[30px] sm:text-[40px] md:text-6xl'
              words='NeihTdev'
            />
            <div className='!mt-8  text-sm !leading-8 sm:text-lg  md:text-xl'>
              <p>
                I'm a software engineer and a web developer. I have a passion for creating and
                developing websites and applications. I'm always looking for new challenges and
                opportunities to learn and grow.
              </p>
              <p>
                I'm currently working as a freelance web developer. I have experience in working
                with various technologies and frameworks such as React, Next.js, Node.js, and
                Express.js.
              </p>
              <p>
                I'm also interested in machine learning and artificial intelligence. I have worked
                on projects related to natural language processing, computer vision, and deep
                learning.
              </p>
            </div>
          </div>
        </section>
      </HeroHighlight>
    </div>
  );
}
