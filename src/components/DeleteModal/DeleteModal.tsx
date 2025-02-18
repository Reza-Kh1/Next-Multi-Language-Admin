import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { FaTrash } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
type DeleteModalType = {
    onSubmit: (vlaue: number) => void
    id: number

}
export default function DeleteModal({ onSubmit, id }: DeleteModalType) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <Button onPress={() => onOpen()} variant='bordered' className='bg-d-btn rounded-md text-white'>
                <FaTrash />
                Delete
            </Button>
            <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Delete Modal</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete the selected item?
                    </ModalBody>
                    <ModalFooter className='flex justify-between'>
                        <Button className='rounded-md' onPress={() => { onSubmit(id), onClose() }}>
                            <FaTrash />
                            Delete
                        </Button>
                        <Button className='rounded-md' onPress={() => onClose()}>
                            <MdClose />
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
