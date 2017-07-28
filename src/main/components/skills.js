import Inferno from 'inferno';

export const List = ({ children }) => (
    <ul className="skills-list">{children}</ul>
);

export const Item = ({ title, proficiency }) => (
    <li className="skills-item">
        <div className="item-title">{title}</div>
        <div className="item-bar" fill={proficiency}></div>
    </li>
);