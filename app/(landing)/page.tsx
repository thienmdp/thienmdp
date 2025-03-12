import { About, Hero, Product } from '@/components/landing';

export default function Home() {
  return (
    <div className='bg-white dark:bg-black-100'>
      <Hero />
      <Product />
      <About />
      <div className='min-h-[100vh]'></div>
    </div>
  );
}
