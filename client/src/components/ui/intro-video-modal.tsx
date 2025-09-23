import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/ui/video-player';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function IntroVideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  // عرض الفيديو عند تحميل الصفحة لأول مرة
  useEffect(() => {
    const hasSeenIntroVideo = localStorage.getItem('hasSeenIntroVideo');
    
    // عرض الفيديو فقط إذا لم يشاهده المستخدم من قبل
    if (!hasSeenIntroVideo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // تأخير قصير لإعطاء الموقع وقت للتحميل
      
      return () => clearTimeout(timer);
    }
  }, []);

  // عند إغلاق الفيديو
  const handleClose = () => {
    setIsOpen(false);
    // حفظ حالة المشاهدة في التخزين المحلي
    localStorage.setItem('hasSeenIntroVideo', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-bold">مركز راي للتدريب والاستشارات</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute left-2 top-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="mt-2">
          <VideoPlayer
            src="/videos/Synthesia.mp4"
            autoPlay={true}
            controls={true}
            muted={false}
            className="rounded-md"
            onEnded={handleClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}