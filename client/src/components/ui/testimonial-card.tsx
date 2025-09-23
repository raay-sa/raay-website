import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  slidesPerView: number;
}

export default function TestimonialCard({ testimonial, slidesPerView }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    
    return stars;
  };

  return (
    <div className={`testimonial-card p-3 flex-shrink-0`} style={{ width: `${100 / slidesPerView}%` }}>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
        <div className="flex items-center mb-4">
          <img 
            src={testimonial.image} 
            alt={`صورة ${testimonial.name}`} 
            className="w-14 h-14 rounded-full object-cover ml-4"
          />
          <div>
            <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
            <p className="text-gray-600 text-sm">{testimonial.title}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-3">{testimonial.comment}</p>
        <div className="flex text-secondary">
          {renderStars(testimonial.rating)}
        </div>
      </div>
    </div>
  );
}
