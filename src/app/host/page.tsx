"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HostRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push('/host/pages');
    }, [router]);

    return null;
}
