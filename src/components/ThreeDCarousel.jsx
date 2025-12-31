import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Card = ({ src, index }) => {
    return (
        <motion.div
            style={{
                minWidth: '300px',
                height: '400px',
                margin: '0 20px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                background: '#fff'
            }}
            whileHover={{ scale: 1.05, rotateY: 0, zIndex: 10 }}
            initial={{ rotateY: 15, z: -50, opacity: 0.9 }}
            whileInView={{ rotateY: 0, z: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.5 }}
        >
            <img
                src={src}
                alt={`Memory ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </motion.div>
    );
};

const ThreeDCarousel = ({ images }) => {
    const scrollRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: scrollRef });

    return (
        <div className="perspective-container" style={{ perspective: '1000px', padding: '4rem 0' }}>
            <motion.div
                ref={scrollRef}
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: '2rem',
                    gap: '1rem',
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none'  /* IE 10+ */
                }}
                className="hide-scrollbar"
            >
                {images.map((src, index) => (
                    <Card key={index} src={src} index={index} />
                ))}
            </motion.div>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#888', fontStyle: 'italic' }}>
                Swipe to travel through time {' ->'}
            </div>
        </div>
    );
};

export default ThreeDCarousel;
