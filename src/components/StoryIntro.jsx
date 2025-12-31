import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaMale, FaFemale, FaHeart, FaUserFriends } from 'react-icons/fa';

const StoryIntro = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            // Step 0: Walking (Start)
            await new Promise(r => setTimeout(r, 1000));
            setStep(1); // Walking towards center

            // Step 1 -> 2: Meeting point
            await new Promise(r => setTimeout(r, 3000));
            setStep(2); // Stop and look

            // Step 2 -> 3: The Moment
            await new Promise(r => setTimeout(r, 1500));
            setStep(3); // Hearts appear

            // Step 3 -> Finish
            await new Promise(r => setTimeout(r, 3000));
            onComplete();
        };
        sequence();
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 1000,
                background: '#FAFAFA',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Boy and Friends Group */}
                <motion.div
                    initial={{ x: -300 }}
                    animate={step >= 1 ? { x: -50 } : { x: -300 }}
                    transition={{ duration: 3, ease: "linear" }}
                    style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <div style={{ color: '#888', transform: 'scale(0.8)' }}>
                        <FaUserFriends size={50} />
                    </div>
                    <motion.div
                        animate={step === 2 || step === 3 ? { rotateY: 180 } : {}}
                        style={{ color: '#555' }}
                    >
                        <FaMale size={80} color="#2D2D2D" />
                    </motion.div>
                </motion.div>

                {/* Girl Passing By */}
                <motion.div
                    initial={{ x: 300 }}
                    animate={step >= 1 ? { x: 50 } : { x: 300 }}
                    transition={{ duration: 3, ease: "linear" }}
                    style={{ position: 'absolute' }}
                >
                    <motion.div
                        animate={step === 2 || step === 3 ? { rotateY: -180 } : { rotateY: 0 }}
                    >
                        <FaFemale size={80} color="#FF6B6B" />
                    </motion.div>
                </motion.div>

                {/* The Spark */}
                <AnimatePresence>
                    {step === 3 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ position: 'absolute', top: '20%' }}
                        >
                            <FaHeart color="#FF6B6B" size={60} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={{ marginTop: '2rem', height: '50px', display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <AnimatePresence mode='wait'>
                    {step === 1 && (
                        <motion.p
                            key="text1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ fontSize: '1.2rem', color: '#666' }}
                        >
                            Just an ordinary day...
                        </motion.p>
                    )}
                    {step === 2 && (
                        <motion.p
                            key="text2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ fontSize: '1.2rem', color: '#666' }}
                        >
                            Until our eyes met...
                        </motion.p>
                    )}
                    {step === 3 && (
                        <motion.p
                            key="text3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#FF6B6B' }}
                        >
                            And the world stood still.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={onComplete}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '8px 16px',
                    color: '#999',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    zIndex: 1001,
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid #eee',
                    borderRadius: '4px'
                }}
            >
                Skip Intro
            </button>

        </motion.div>
    );
};

export default StoryIntro;
