import { useEffect, type RefObject } from 'react';

export const useClickOutside = (
    ref: RefObject<HTMLDivElement | null>,
    onClose: () => void,
    visible: boolean = true
    ) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        }
            
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
            
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, visible, onClose]);
};