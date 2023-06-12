import {
    ReactNode,
    useState,
    useRef,
    useEffect,
    MouseEvent,
    KeyboardEvent,
    useCallback,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isOpening, setIsOpening] = useState(false);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (e: MouseEvent) => e.stopPropagation();

    const onKeyDown = useCallback(
        (e: KeyboardEvent): void => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        },
        [closeHandler],
    );

    useEffect(() => {
        if (isOpen) {
            timerRef.current = setTimeout(() => {
                setIsOpening(true);
            }, 0);
            window.addEventListener('keydown', (e: any) => onKeyDown(e));
        }

        return () => {
            setIsOpening(false);
            if (timerRef.current) clearTimeout(timerRef.current);
            window.removeEventListener('keydown', (e: any) => onKeyDown(e));
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpening,
        [cls.isClosing]: isClosing,
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
