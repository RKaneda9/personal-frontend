import Inferno from 'inferno';

export const List = ({ children }) => (
	<ul className="experience-list">
		{children}
	</ul>
);

export const Link = ({ type, target, href, icon, text }) => (
	<li className={`item-${type}`}>
		<a 
			className="link" 
			target={target}
			href={href}>
			<span className={`fa fa-${icon}`}></span>
			<span className="text">{text}</span>
		</a>
	</li>
);

export const Location = ({ address }) => (
	<Link 
		type="location" 
		target="google-maps"
		href={`http://maps.google.com/maps?q=${address}`}
		icon="map-marker"
		text={address}>
	</Link>
);

export const Site = ({ domain, protocol }) => (
	<Link
		type="site"
		target="site"
		href={`${protocol || "http://"}${domain}`}
		icon="external-link"
		text={domain}>
	</Link>
);

export const Item = ({ company, start, end, title, description, location, site }) => (
	<li className="experience-item">
		<div className="item-info">
			<div className="item-company">{company}</div>
			<div className="item-timespan">{`${start} - ${end}`}</div>
		</div>
		<div className="item-details">
			<p className="item-title">{title}</p>
			<p className="item-description">{description}</p>
			<ul className="item-links">
				{location ? (<Location {...location} />) : null}
				{site     ? (<Site     {...site}     />) : null}
			</ul>
		</div>
	</li>
);
