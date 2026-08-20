import "./HowItWorks.scss";

import SectionHeader from "../../common/SectionHeader/SectionHeader";

import { howItWorks } from "../../../constants/Landing/HowitWorks.data";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works__container">
        <SectionHeader
          badge="HOW IT WORKS"
          title="From job search to interview-ready"
          description="A smarter workflow that helps you move from resume to interview with less effort."
        />

        <div className="how-it-works__steps">
          {howItWorks.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="how-it-works__step-wrapper">
                <div className="how-it-works__step">
                  <div className="how-it-works__number">{item.step}</div>

                  <div className="how-it-works__icon">
                    <Icon />
                  </div>

                  <h3 className="how-it-works__title">{item.title}</h3>

                  <p className="how-it-works__description">
                    {item.description}
                  </p>
                </div>

                {index < howItWorks.length - 1 && (
                  <div className="how-it-works__connector" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
