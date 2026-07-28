import { Card, CardContent } from "@mui/material";

import SectionHeader from "../../common/SectionHeader/SectionHeader";
import { features } from "../../../constants/Landing/Feature.data";

import "./Feature.scss";

const Features = () => {
  return (
    <section className="features">
      <SectionHeader
        badge="FEATURES"
        title="Everything you need to land your dream job"
        description="HireCoder combines AI-powered tools to help you build better resumes, prepare for interviews, and increase your chances of getting hired."
      />

      <div className="features__grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.id} className="features__card" elevation={0}>
              <CardContent>
                <div className="features__icon">
                  <Icon fontSize="large" />
                </div>

                <h3 className="features__title">{feature.title}</h3>

                <p className="features__description">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
