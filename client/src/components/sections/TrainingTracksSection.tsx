import { tracks } from "@/data/tracks";
import TrackCard from "@/components/ui/track-card";

export default function TrainingTracksSection() {
  return (
    <section id="tracks" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2a2665] section-heading mb-4">مسارات التدريب</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">برامج تدريبية متخصصة في مسارات متنوعة تلبي احتياجات سوق العمل السعودي وتواكب رؤية المملكة 2030</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {tracks().map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
