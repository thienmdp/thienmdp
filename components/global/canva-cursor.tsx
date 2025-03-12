'use client';

import useCanvasCursor from '@/hooks/canvaCursor';

const CanvasCursor = () => {
  useCanvasCursor();

  return <canvas className='pointer-events-none fixed inset-0 z-[1]' id='canvas' />;
};
export default CanvasCursor;
