import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";

interface DashboardPopupProps {
    isOpen: boolean;
    log: any;
    onClose: () => void;
    }

const DashboardPopup: React.FC<DashboardPopupProps> = ({ isOpen, log, onClose }) => {
  if (!log) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Log Details</DialogTitle>
          <DialogDescription>Details of the selected log.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-right font-semibold">Log:</Label>
            <span>{log.logs}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-right font-semibold">Date:</Label>
            <span>{log.date}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-right font-semibold">Activity:</Label>
            <span>{log.activity}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPopup;
