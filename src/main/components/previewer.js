import Inferno from 'inferno';

export const Popup = ({ onLoad, children }) => (
	<div className="previewer show">
		<div className="previewer-cover"></div>
		<div ref={onLoad} className="previewer-content">
			{children}
		</div>
	</div>
);

export const Button = ({ name, anim, text, icon, onClick }) => {

	let className, iconName, el, onLoad, onTouchEnd;

	className  = 'btn';
	iconName   = 'anim-out';
	el         = null;
	onLoad 	   = _el => { el = _el };
	onTouchEnd = ()  => {
		if (el) {
			el.classList.add('no-hover');
		}
	};

	if (name) { className += ` ${name}-btn`; }
	if (anim) { className += ` anim`;        }

	if (name.includes('close')) {
		iconName += " icon -close";
	}
	else {
		iconName += ` fa fa-${icon}`;
	}

	return (
		<button 
			ref={onLoad}
			onTouchEnd={onTouchEnd}
			onClick={onClick}
			className={className}>
			<span className={iconName}></span>
			<span className="text anim-in">{text}</span>
		</button>
	);
};