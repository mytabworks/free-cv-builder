import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "./button";

type ModalConfirmProps = {
  show: boolean;
  title?: React.ReactNode;
  message: React.ReactNode;
  cancel?: React.ReactNode;
  confirm?: React.ReactNode;
  onConfirm: (result: boolean) => void;
  onCancel?: () => void;
};

export function ModalConfirm({ 
  show,
  title, 
  message, 
  cancel = "No", 
  confirm = "Yes", 
  onConfirm,
}: ModalConfirmProps) {
  const handleConfirm = (result: boolean) => {
    onConfirm(result);
  };

  return (
    <Dialog.Root open={show}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-10 fixed inset-0 bg-gray-900 bg-opacity-50" />
        <Dialog.Content className="z-10 fixed bg-white p-3 sm:p-6 rounded-md shadow-lg top-1/2 left-[1rem] max-sm:right-[1rem] sm:left-1/2 transform sm:-translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
          <Dialog.Description className="mt-4">{message}</Dialog.Description>
          <div className="mt-6 flex justify-end space-x-4">
            <Button
              variant="secondary"
              onClick={() => handleConfirm(false)}
            >
              {cancel}
            </Button>
            <Button
              onClick={() => handleConfirm(true)}
            >
              {confirm}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}