import Inferno from 'inferno';

const Device = ({ name, x, y, scale, active, disabled, onClick, children }) => {

	let styles    = { transform: `translate(${x}px, ${y}px) scale(${scale})` };
	let className = `device ios ${name}`;

	if (active)   { className += " active";   }
	if (disabled) { className += " disabled"; }

	return (
		<div
			onClick={onClick} 
			className={className}
			style={styles}>

			{children}

		</div>
	);
}

export const Image = ({ onRef, onError, url, y, manualDrag }) => {

	let className = "";
	let styles    = {};

	if (y)          { styles.transform = `translateY(-${y}px)`; }
	if (manualDrag) { className += 'manual-drag'; }

	return (
		<img
			className={className}
			style={styles}
			ref={onRef}
			onError={onError}
			src={url} />
	);
};

export const ImageCover = ({ onDrag, onDragStart, onDragEnd }) => (
	<div
		draggable="true"
		onDrag={onDrag}
		onDragStart={onDragStart}
		onDragEnd={onDragEnd} 
		className="image-cover" />
);

export const Display = ({ children }) => (
	<div className="display">{children}</div>
);

export const IPhone = (props) => (
	<Device name="iphone" {...props}>
		<div className="silent cover-btn"></div>
		<div className="vol-up cover-btn"></div>
		<div className="vol-down cover-btn"></div>
		<div className="power cover-btn"></div>

		<div className="cover">
			<div className="strip top left"></div>
			<div className="strip top right"></div>
			<div className="strip bot left"></div>
			<div className="strip bot right"></div>

			<div className="screen">
				<div className="shadow"></div>

				<div className="camera">
					<div className="bulb"></div>
				</div>

				<div className="ear-speaker"></div>

				<div className="home-btn">
					<div className="inner-btn"></div>
				</div>

				{props.children}
			</div>
		</div>
	</Device>
);

export const IPad = (props) => (
	<Device name="ipad v9_7" {...props}>
		<div className="cover">
			<div className="screen">
				<div className="camera">
					<div className="bulb"></div>
				</div>

				<div className="home-btn">
					<div className="inner-btn"></div>
				</div>

				{props.children}
			</div>
		</div>
	</Device>
);

export const MacbookPro = (props) => (
	<Device name="macbook-pro" {...props}>
		<div className="cover">
			<div className="screen">
				<div className="camera">
					<div className="bulb"></div>
				</div>

				{props.children}

				<div className="logo">
					<span className="text fa fa-apple"></span>
				</div>
			</div>
		</div>
		<div className="bottom">
			<div className="front-top">
				<div className="indention"></div>
			</div>
			<div className="front-bot"></div>
		</div>
	</Device>
);