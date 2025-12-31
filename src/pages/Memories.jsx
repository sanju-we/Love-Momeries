import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import ThreeDCarousel from '../components/ThreeDCarousel';
import StoryIntro from '../components/StoryIntro';

const images = [
    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522205408450-add114ad53fe?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
];

const MemoriesContent = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ background: '#FFF0F0', minHeight: '100vh', paddingBottom: '4rem', overflowX: 'hidden' }}
        >
            <FloatingHearts />

            {/* Floating Logout */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 100,
                    background: 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    color: 'var(--color-primary)'
                }}
            >
                <FaSignOutAlt />
            </motion.button>

            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                style={{ opacity, scale }}
                className="full-screen flex-center"
            >
                <div style={{ maxWidth: '800px', padding: '2rem', textAlign: 'center', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#E25555' }}>
                            After All This Distance...
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{ fontSize: '1.2rem', color: '#666', lineHeight: '2' }}
                    >
                        "They say distance makes the heart grow fonder, and they were right.
                        Every mile between us only made the moment we met more magical.
                        Here's to us, to our journey, and to the beautiful reality we now share."
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        style={{ marginTop: '3rem', fontSize: '2rem', color: '#FF6B6B' }}
                    >
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                            ↓
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* 3D Carousel Section */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 className="text-center" style={{ marginBottom: '2rem', color: 'var(--color-primary-dark)' }}>Our Journey Passing By</h2>
                <ThreeDCarousel images={images} />
            </div>

            {/* Grid Layout for remaining images */}
            <div style={{
                maxWidth: '1200px',
                margin: '4rem auto',
                padding: '2rem',
                columns: '3 300px',
                columnGap: '1.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                <h2 className="text-center" style={{ marginBottom: '2rem', width: '100%' }}>All the Little Moments</h2>
                {images.slice().reverse().map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        style={{
                            marginBottom: '1.5rem',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            breakInside: 'avoid',
                            background: 'white'
                        }}
                    >
                        <img
                            src={src}
                            alt={`Memory ${index + 1}`}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </motion.div>
                ))}
            </div>

            <div className="text-center" style={{ marginTop: '4rem', color: '#888', paddingBottom: '2rem' }}>
                <p>Made with Love, for You. ♥</p>
            </div>
        </motion.div>
    );
};

const Memories = () => {
    const [showStory, setShowStory] = useState(true);

    return (
        <>
            <AnimatePresence>
                {showStory && <StoryIntro onComplete={() => setShowStory(false)} />}
            </AnimatePresence>

            {!showStory && <MemoriesContent />}
        </>
    );
};

export default Memories;
