import { useEffect } from 'react';

export default function GallaBoxChat({ align }) {


    const ChatScript = () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiaHR0cHM6Ly93d3cuc2VkYXJnbG9iYWwuY29tLyIsImlkIjoiNjVjZGEyYTMwMTJlMDQ0ODRhZTU0ODc0IiwiYWNjSWQiOiI2NTgzZGRhYTEzZmU0ZmJhMTQzYWY5MmYiLCJpYXQiOjE3MDkyNzE0MDF9.sCQ1LU0xL2dTmzDYXqVzYEl_sW2LcgievcF77IHINnU";
        (function (w, d, s, u, t) {
            w.Chatty = function (c) { w.Chatty._.push(c) };
            w.Chatty._ = [];
            w.Chatty.url = u;
            w.Chatty.hash = t;
            var h = d.getElementsByTagName(s)[0],
                j = d.createElement(s);
            j.async = true;
            j.src = 'https://widget.gallabox.com/chatty-widget.min.js?_=' + Math.random();
            h.parentNode.insertBefore(j, h);
        })(window, document, 'script', 'https://widget.gallabox.com', token);

    }

    return (
        <div id='zsiqwidget'>
            <ChatScript />
        </div>
    );



}
