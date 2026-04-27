import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

export interface ClassInfo {
    id: string | number;
    name: string;
    class_type: string;
    instructor: string;
    price: string;
    location: string;
    embed_url: string;
}

export const useClasses = () => {
    const [classes, setClasses] = useState<ClassInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: any = await apiClient.get('/widget/classes');
            if (response.success && Array.isArray(response.classes)) {
                setClasses(response.classes);
            } else {
                setClasses([]);
            }
        } catch (err: any) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return { classes, loading, error, refresh: fetchClasses };
};
