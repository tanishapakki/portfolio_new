import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./404.css";

export default function NotFound() {
    return (
        <main className="notfound">
            {/* Floating stars */}
            <div className="stars">
                {Array.from({ length: 40 }).map((_, i) => (
                    <span
                        key={i}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="ufo"
                    animate={{
                        y: [0, -12, 0],
                        rotate: [-2, 2, -2],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                    }}
                >
                    🛸
                </motion.div>

                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    404
                </motion.h1>

                <h2>The page has been abducted.</h2>

                <p>
                    We searched the galaxy, checked under the couch,
                    and even asked the aliens...
                    it's nowhere to be found.
                </p>

                <Link to="/" className="home-btn">
                    Beam Me Home →
                </Link>
            </motion.div>
        </main>
    );
}