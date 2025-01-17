import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

interface EditModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const EditModal: React.FC<EditModalProps> = ({
    open,
    onClose,
    title,
    children,
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
            <Dialog.Content className="fixed bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Title className="text-lg font-bold">
                    {title}
                </Dialog.Title>
                <Dialog.Close asChild>
                    <button className="absolute top-3 right-3 text-gray-600 hover:text-black">
                        X
                    </button>
                </Dialog.Close>
                <div className="mt-4">{children}</div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
