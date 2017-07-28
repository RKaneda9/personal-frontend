import Inferno from 'inferno';

export const Page = ({ name, children }) => (
    <div className={`page ${name}`}>
        {children}
    </div>
);

export const Header = ({ children }) => (
    <div className="page-header">{children}</div>
);

export const Title = ({ children }) => (
    <div className={"title"}>
        {children}
    </div>
);

export const SubTitle = ({ children }) => (
    <div className="sub-title">
        {children}
    </div>
);

export const Quote = ({ author, text }) => (
    <SubTitle>
        <p>"{text}"</p>
        <p>- {author}</p>
    </SubTitle>
);