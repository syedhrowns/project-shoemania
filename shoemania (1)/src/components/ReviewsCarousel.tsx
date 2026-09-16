import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: 'Marcus Vance',
    location: 'New York, NY',
    badge: 'Verified Buyer',
    shoe: 'Off-White x Nike Air Force 1',
    rating: 5,
    title: 'Unbeatable authenticity',
    review: 'Double boxed with full verification tags. Came in flawless deadstock condition. ShoeMania is hands down my most trusted source for high-tier grails.',
    date: '2 days ago',
    initials: 'MV',
  },
  {
    name: 'Elena Rostova',
    location: 'Los Angeles, CA',
    badge: 'Verified Buyer',
    shoe: 'New Balance X-90 Suede',
    rating: 5,
    title: 'Art-piece packaging',
    review: 'Passed independent third-party authentication with flying colors. The attention to detail in packaging and original box preservation is next level.',
    date: '1 week ago',
    initials: 'ER',
  },
  {
    name: 'Devon Hayes',
    location: 'Chicago, IL',
    badge: 'Verified Buyer',
    shoe: 'Adidas Yeezy Boost 350 V2',
    rating: 5,
    title: 'Found my grail fast',
    review: 'I had been hunting this colorway for over two years. Delivered pristine with flawless stitching, genuine tags, and perfect fit.',
    date: '2 weeks ago',
    initials: 'DH',
  },
  {
    name: 'Sarah Jenkins',
    location: 'Miami, FL',
    badge: 'Verified Buyer',
    shoe: 'Nike SB Dunk Low Pro',
    rating: 5,
    title: 'Insane fast shipping',
    review: 'Was blown away by how quickly this arrived. Grails verified, crisp box. Will be coming back for more.',
    date: '3 weeks ago',
    initials: 'SJ',
  },
  {
    name: 'Liam Carter',
    location: 'London, UK',
    badge: 'Verified Buyer',
    shoe: 'Air Jordan 1 Retro High',
    rating: 5,
    title: 'Pristine authentication',
    review: 'The peace of mind I get shopping here is unmatched. They authenticate perfectly, and the shoe was absolutely flawless.',
    date: '1 month ago',
    initials: 'LC',
  },
  {
    name: 'Chloe Tran',
    location: 'Toronto, ON',
    badge: 'Verified Buyer',
    shoe: 'Nike Air Max 270 React',
    rating: 5,
    title: 'Incredible service',
    review: 'Had a question about sizing and support got back to me instantly. The shoes fit perfectly and look phenomenal in person.',
    date: '1 month ago',
    initials: 'CT',
  },
  {
    name: 'James Wilson',
    location: 'Sydney, AU',
    badge: 'Verified Buyer',
    shoe: 'TS Dunk Low',
    rating: 5,
    title: 'Holy grail acquired',
    review: 'Been looking for these forever. The condition is absolutely perfect. Could not be happier with the purchase experience.',
    date: '1 month ago',
    initials: 'JW',
  },
  {
    name: 'Maya Patel',
    location: 'Austin, TX',
    badge: 'Verified Buyer',
    shoe: 'JRDN 4 \'BRED REIMAGINED\'',
    rating: 5,
    title: 'Best drop experience',
    review: 'The drop was so smooth and the shipping was immediate. No bots, just pure sneakerhead heaven. A+ service.',
    date: '2 months ago',
    initials: 'MP',
  },
  {
    name: 'David Kim',
    location: 'Seattle, WA',
    badge: 'Verified Buyer',
    shoe: 'KOBE 8 \'COURT PURPLE\'',
    rating: 5,
    title: 'Perfect transaction',
    review: 'Box was beautifully protected, came with all the original accessories. Flawless execution from start to finish.',
    date: '2 months ago',
    initials: 'DK',
  },
  {
    name: 'Anna Dubois',
    location: 'Paris, FR',
    badge: 'Verified Buyer',
    shoe: 'DIOR 1 HIGH',
    rating: 5,
    title: 'Luxury treatment',
    review: 'For a piece this rare and expensive, the handling was perfect. Everything arrived in immaculate condition. 10/10.',
    date: '3 months ago',
    initials: 'AD',
  }
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4500); // Change slide every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  const getCardStyles = (index: number) => {
    const diff = (index - currentIndex + reviews.length) % reviews.length;
    
    // Smooth 3D Carousel logic
    if (diff === 0) {
      // Center (Active)
      return { x: '0%', scale: 1, opacity: 1, zIndex: 30 };
    } else if (diff === 1) {
      // Right
      return { x: '105%', scale: 0.85, opacity: 0.4, zIndex: 20 };
    } else if (diff === reviews.length - 1) {
      // Left
      return { x: '-105%', scale: 0.85, opacity: 0.4, zIndex: 20 };
    } else if (diff === 2) {
      // Far Right (hidden but ready to enter)
      return { x: '200%', scale: 0.7, opacity: 0, zIndex: 10 };
    } else if (diff === reviews.length - 2) {
      // Far Left (hidden but ready to enter)
      return { x: '-200%', scale: 0.7, opacity: 0, zIndex: 10 };
    } else {
      // Background / hidden
      return { x: '0%', scale: 0.5, opacity: 0, zIndex: 0 };
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[450px] flex items-center justify-center overflow-hidden py-10 mt-8 cursor-default select-none pointer-events-none">
      {reviews.map((item, idx) => {
        const styles = getCardStyles(idx);
        const isCenter = (idx - currentIndex + reviews.length) % reviews.length === 0;

        return (
          <motion.div
            key={idx}
            initial={false}
            animate={{
              x: styles.x,
              scale: styles.scale,
              opacity: styles.opacity,
              zIndex: styles.zIndex,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.9,
            }}
            className={`absolute w-full max-w-[320px] sm:max-w-[400px] h-[340px] bg-zinc-50/90 backdrop-blur-xl border border-zinc-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left pointer-events-auto shadow-md ${
              isCenter ? 'bg-white shadow-2xl border-zinc-200' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-zinc-900 text-zinc-900" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 bg-white px-3 py-1 rounded-full border border-zinc-200/80 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                  {item.badge}
                </span>
              </div>
              <h3 className="font-sans font-bold text-zinc-900 text-lg tracking-tight mb-2.5">
                {item.title}
              </h3>
              <p className="text-zinc-600 font-sans text-[15px] leading-relaxed mb-6 font-normal line-clamp-4">
                "{item.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 text-white font-sans text-xs font-bold flex items-center justify-center tracking-wider shrink-0 shadow-sm">
                  {item.initials}
                </div>
                <div className="overflow-hidden">
                  <p className="font-sans font-bold text-zinc-900 text-sm tracking-wide uppercase leading-tight truncate">{item.name}</p>
                  <p className="text-xs text-zinc-500 font-medium tracking-wide mt-0.5 truncate">{item.shoe}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
