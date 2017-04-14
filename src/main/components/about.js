import Inferno from 'inferno';

export const Image = ({ src }) => (
	<div className="about-image col">
		<img src={src} />
	</div>
);

export const Details = ({ children }) => (
	<div className="about-details col">{children}</div>
);

export const Detail = ({ label, value }) => (
	<div className="detail">
		<p className="detail-label">{label}:</p>
		<p className="detail-value">{value}</p>
	</div>
);

export const Description = ({ children }) => (
	<div className={"about-desc col"}>
		{children}
	</div>
);