'use client'
import { useRouter } from 'next/navigation';

function DirectTo(path: string) {
    const router = useRouter();
    return router.push(path);
}

export default DirectTo;