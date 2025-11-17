import LinkComponent from '@components/Link';
import { IconComponent } from '@components/image';
import { useRouter } from 'next/router';
import { isMobile } from "react-device-detect";

const Logo = (props) => {
    const { locale } = useRouter();
    if (props?.image_path) {
        return <LinkComponent href={"/"}>
            {/* <img src={data.CHILD[0].SUB_CHILD[0].image_path} alt="sedar logo" className="logoimage" width="auto" height="auto" /> */}
            <IconComponent
                justifyContent={locale.indexOf("-ar") !== -1 ? "right" : "left"}
                classprops="logoimage"
                src={props.image_path}
                alt={props.image_alt_seo || 'Sedar Global'}
                width={isMobile ? 96 : 121}
                height={isMobile ? 43 : 55}
                quality={100}
                padding={'0 10px'}
            />
        </LinkComponent>
    } else {
        return <LinkComponent href={"/"}>
            {/* <img src={`/assets/images/logo@2x.png`} alt="sedar logo" className="logoimage" width="auto" height="auto" /> */}
            <IconComponent
                justifyContent={locale.indexOf("-ar") !== -1 ? "right" : "left"}
                classprops="logoimage"
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/images/logo@2x.png`}
                alt={'Sedar Global'}
                width={101}
                height={50}
                quality={100}
                padding={'0 10px'}
            />
        </LinkComponent>
    }

};

export default Logo;