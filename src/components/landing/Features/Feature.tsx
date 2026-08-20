import { ArrowForward } from "@mui/icons-material";

import { Card, CardContent } from "@mui/material";

import SectionHeader from "../../common/SectionHeader/SectionHeader";

import { features } from "../../../constants/Landing/Feature.data";

import "./Feature.scss";

const Features = () => {
  return (
    <section className="features">
      <div className="features__container">
        <SectionHeader
          badge="FEATURES"
          title="Everything you need to land your dream job"
          description="HireCoder brings your entire job search into one intelligent workspace."
        />

        <div className="features__grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.id}
                className={`features__card features__card--${index + 1}`}
                elevation={0}
              >
                <CardContent>
                  <div className="features__top">
                    <div className="features__icon">
                      <Icon />
                    </div>

                    <ArrowForward className="features__arrow" />
                  </div>

                  <h3 className="features__title">{feature.title}</h3>

                  <p className="features__description">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
