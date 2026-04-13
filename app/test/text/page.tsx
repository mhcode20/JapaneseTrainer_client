'use client';

import { useState, useRef, useLayoutEffect } from 'react';

export default function TextMeasurer() {
    const [text, setText] = useState('Hello World');
    const [width, setWidth] = useState(0);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (textRef.current) {
            // 1. Get the computed styles of the div to match font exactly
            const styles = window.getComputedStyle(textRef.current);
            const font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;

            // 2. Use Canvas API to measure
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (context) {
                context.font = font;
                const metrics = context.measureText(text);
                setWidth(metrics.width);
            }
        }
    }, [text]); // Re-run whenever the text state changes

    return (
        <div className="p-8">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border p-2 mb-4 block w-full text-black"
            />

            <div className="flex items-center gap-4">
                <div
                    ref={textRef}
                    className="inline-block bg-blue-100 p-2 text-xl font-bold"
                >
                    {text}
                </div>

                <p className="text-sm text-gray-500">
                    Width: <strong>{width.toFixed(2)}px</strong>
                </p>
            </div>
            

            

        </div>
    );
}