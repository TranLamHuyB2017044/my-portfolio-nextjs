import { useEffect, useState } from 'react';

export default function InfoSection() {
    const [html, setHtml] = useState('');

    useEffect(() => {
        (async () => {
            const res = await fetch('/content/info.md');
            const text = await res.text();
            setHtml(text);
        })();
    }, []);

    return (
        <section id="infomation" className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    );
}
