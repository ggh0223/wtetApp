"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

type ImageDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  altText: string;
};

const ImageDialog: React.FC<ImageDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  imageUrl, 
  altText 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[90vw] h-[90vh] p-0">
        {/* 스크린 리더를 위한 제목 추가 */}
        <DialogTitle className="sr-only">
          Image Preview: {altText}
        </DialogTitle>

        <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
          
          <Button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white/100 dark:bg-gray-800/90 dark:hover:bg-gray-800/100"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {altText && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-gray-900/90">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {altText}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;