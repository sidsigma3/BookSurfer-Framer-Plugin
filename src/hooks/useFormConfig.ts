import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
    required: boolean;
    options?: { label: string; value: string }[];
    placeholder?: string;
}

export interface FormConfig {
    id: string;
    classId: string | number;
    title: string;
    fields: FormField[];
    submitButtonText: string;
    successMessage: string;
}

export const useFormConfig = (classId: string | number | null) => {
    const [config, setConfig] = useState<FormConfig | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!classId) {
            setConfig(null);
            return;
        }

        const fetchConfig = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetching form configuration specifically for this class
                const response = await apiClient.get(`/widget/classes/${classId}/form-config`);
                setConfig(response as unknown as FormConfig);
            } catch (err: any) {
                setError(err.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [classId]);

    return { config, loading, error };
};
