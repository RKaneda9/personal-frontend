import Inferno from 'inferno';

export const SocialList = ({ children }) => (
    <div className="social">{children}</div>
);

export const SocialLink = ({ type, href, text, icon }) => {
    
    let el         = null;
    let onLoad        = _el => { el = _el };
    let onTouchEnd = ()  => {
        if (el) {
            el.classList.add('no-hover');
        }
    }

    return (
        <a 
            ref={onLoad}
            onTouchEnd={onTouchEnd}
            className={`social-link ${type} anim`} 
            target="social" 
            href={href}>
            <span className={`fa fa-${icon} anim-out`}></span>
            <span className="text anim-in">{text}</span>
        </a>
    );
};