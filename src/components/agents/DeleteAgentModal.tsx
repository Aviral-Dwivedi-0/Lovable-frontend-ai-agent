import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DeleteAgentModal({ open, onClose, onConfirm, agent }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Agent</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          Are you sure you want to delete <b>{agent?.name}</b>?
          <br />
          <span className="text-red-600">This action cannot be undone.</span>
        </div>
        <DialogFooter>
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
