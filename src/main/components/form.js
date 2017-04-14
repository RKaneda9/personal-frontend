import Inferno from 'inferno';
import enums   from '../helpers/enums';

export const Row = ({ children }) => (
	<div className="input-row">{children}</div>
);

export const Col = ({ children }) => (
	<div className="input-col">{children}</div>
);

const Cover = ({ type }) => {
	switch (type) {
		case enums.level.success:
			return (
				<div className="cover success">
					<span className="fa fa-check"></span>
				</div>
			);
		case enums.level.error:
			return (
				<div className="cover error">
					<span className="fa fa-times"></span>
				</div>	
			);
	}

	return null;
}

export const Button = ({ name, anim, text, icon, onClick, loading, cover }) => {
	let className  = 'btn';
	let coverItem  = null;
	let el         = null;
	let onLoad 	   = _el => { el = _el };
	let onTouchEnd = ()  => {
		if (el) {
			el.classList.add('no-hover');
		}
	}

	if (name)    { className += ` ${name}-btn`; }
	if (anim)    { className += ` anim`;        }
	if (loading) { className += ` loading`;     }

	if (cover) { coverItem = (<Cover type={cover}></Cover>); }

	return (
		<button 
			ref={onLoad}
			onTouchEnd={onTouchEnd}
			onClick={onClick}
			className={className}>
			<span className="text anim-out">{text}</span>
			<span className={`fa fa-${icon} anim-in`}></span>

			{coverItem}
		</button>
	);
};

export const Loader = ({ onRef, active }) => {

	if (!active) { return null; }

	return (
		<div 
			ref={onRef}
			className="loader">
			<svg className="circular" viewBox="25 25 50 50">
				<circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
			</svg>
		</div>
	);
}

export const Popover = ({ display, message, level, direction, arrow }) => {

	if (!display || !message) { return null; }

	let className = `popover has-${level || "error"} ${direction || "top"}`;

	if (arrow) { className += " arrow"; }

	return (
		<div className={className}>{message}</div>
	);
};