import "./SectionHeader.scss";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

const SectionHeader = ({ badge, title, description }: SectionHeaderProps) => {
  return (
    <div className="section-header">
      <span className="section-header__badge">{badge}</span>

      <h2 className="section-header__title">{title}</h2>

      <p className="section-header__description">{description}</p>
    </div>
  );
};

export default SectionHeader;
