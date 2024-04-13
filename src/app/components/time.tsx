'use client'

import { useState, useEffect } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';

export default function Time({
  end_time
}: {
  end_time: Date;
}) {
  const [time, timeChange] = useState('03:00');
  const router = useRouter();
  const params = useParams();
  const pageId = params.id;
  let pathName = usePathname();
  console.log(pathName);

  const countDown = () => {
    // const d = new Date(end_time.getTime() - Date.now());
    const difference = new Date('2024-04-14 04:22:00').getTime() - Date.now()
    const d = new Date(difference);
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0');

    if (difference <= 2000) {
      if (pathName === `/answer`) {
        router.push(`/time_up`)
      } else if (pathName === `/wait_answer/${pageId}`) {
        router.push(`/vote/${pageId}`)
      } else if (pathName === `/vote/${pageId}` || pathName === `/wait_vote/${pageId}`) {
        router.push(`/result/${pageId}`)
      }
      pathName = ''
    }
    timeChange(`${m}:${s}`);

    setTimeout(countDown, 1000);
  };

  useEffect(() => {
    const timeoutId = setTimeout(countDown, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {`残り時間 ${time}`}
    </div>
  );
}