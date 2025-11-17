import { useRouter } from 'next/router';
import React from 'react';

export default function WhatsAppChat() {
    const router = useRouter();
    let customClass = router.asPath.indexOf('/customize') >= 0 ? "whatsAppChat text-end left" : "whatsAppChat text-end"
    return (
        <div className={customClass}>
            <a target="_blank" href="https://wa.me/+97180073327" rel="noreferrer">
                <img effect="blur" src={`/assets/images/iconpng/whatsapp.png`} className="footer_whatsapp" alt="sedarglobal" width="60" height="60" />
                {/* <ImageComponent
                    src={`/assets/images/iconpng/whatsapp.png`}
                    width={60}
                    height={60}
                /> */}
            </a>
        </div>
    )
}
