import { useEffect } from 'react';

export default function FreshChat({align}) {
    useEffect(() => {
        setTimeout(() => {
                typeof window !== "undefined" && window.fcWidget.init({
                    config: {
                        cssNames: {
                            widget: typeof window !== "undefined" && window.location.pathname.indexOf('/customize') >= 0 ? `custom_fc_frame ${align}` : "custom_fc_frame",
                            open: 'custom_fc_open',
                            expanded: 'custom_fc_expanded'
                        }
                    },
                    token: "bb0afb90-1848-41dc-8792-c4b7a2eb5c82",
                    host: "https://wchat.freshchat.com"
                });
        }, 500);
    }, []);

    return true;
}
