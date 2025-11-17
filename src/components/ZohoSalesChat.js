import { useEffect } from 'react';

export default function ZohoSalesChat({ align }) {


    const ChatScript = () => {
        window.$zoho = window.$zoho || {};
        window.$zoho.salesiq = window.$zoho.salesiq || {
            widgetcode: "siqefecae25c4292e803394e958b34a14862de3c0e7283e9bf5509ca4cb6a9b71a1",
            values: {}, ready: function () { }
        };
        let d = document;
        let s = d.createElement("script");
        s.type = "text/javascript";
        s.id = "zsiqscript";
        s.defer = true;
        s.src = "https://salesiq.zohopublic.com/widget";
        let t = d.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(s, t);
    }

    return (
        <div id='zsiqwidget'>
            <ChatScript />
        </div>
    );



}
