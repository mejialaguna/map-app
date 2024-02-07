import { memo } from 'react';

export const Coordenaces = memo(() => {
  return (
    <pre
      id='coordinates'
      className='bg-transparent-black text-white absolute bottom-20 md:bottom-10 left-2.5 px-2.5 py-[5px] m-0 text-[11px] leading-[18px] rounded hidden'
    />
  );
});
