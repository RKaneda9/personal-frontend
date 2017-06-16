import Inferno from 'inferno';

export const List = ({ children }) => (
	<ul className="portfolio-list">{children}</ul>
);

export const Item = ({ title, description, background, onPreview, href }) => {

	let el         = null;
	let onLoad 	   = _el => { el = _el };
	let onTouchEnd = () => {
		if (el) { 
			el.classList.add('no-hover');
		}
	};

	return (
		<li className="portfolio-item">
			<a 
				ref={onLoad}
				onTouchEnd={onTouchEnd}
				className="anim"
				href={href}
				target="mock"
				onClick={onPreview}>
				<img className="item-image" src={background} />
				<div className="item-cover">
					<div className="cover-title">{title}</div>
					<div className="cover-details">{description}</div>
				</div>
				<button className="btn preview-btn">
					<span className="fa fa-search-plus anim-out"></span>
					<span className="text anim-in">Preview</span>
				</button>
			</a>
		</li>
	);
};