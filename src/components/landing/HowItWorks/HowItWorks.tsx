import "./HowItWorks.scss";

import SectionHeader from "../../common/SectionHeader/SectionHeader";
import { howItWorks } from "../../../constants/Landing/HowitWorks.data";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <SectionHeader
        badge="HOW IT WORKS"
        title="Your Journey to Getting Hired"
        description="Four simple steps to improve your resume and increase your chances of landing interviews."
      />

      <div className="how-it-works__steps">
        {howItWorks.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.id} className="how-it-works__step">
              <div className="how-it-works__number">{item.step}</div>

              <div className="how-it-works__icon">
                <Icon fontSize="large" />
              </div>

              <h3 className="how-it-works__title">{item.title}</h3>

              <p className="how-it-works__description">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
