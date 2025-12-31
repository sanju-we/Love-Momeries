import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random().toString(36).substr(2, 9);
            setHearts((prev) => [
                ...prev,
                {
                    id,
                    left: Math.random() * 100, // Random horizontal position
                    duration: Math.random() * 5 + 5, // Random duration between 5s and 10s
                    delay: Math.random() * 2,
                    size: Math.random() * 20 + 10 // Random size
                }
            ]);

            // Cleanup old hearts
            setTimeout(() => {
                setHearts((prev) => prev.filter(h => h.id !== id));
            }, 10000);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: [0, 1, 0] }}
                    transition={{ duration: heart.duration, ease: 'linear', delay: heart.delay }}
                    style={{
                        position: 'absolute',
                        left: `${heart.left}%`,
                        color: '#FF6B6B',
                        fontSize: `${heart.size}px`,
                        opacity: 0.6
                    }}
                >
                    <FaHeart />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
