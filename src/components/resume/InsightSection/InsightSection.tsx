import { Card, CardContent, Typography } from "@mui/material";

import type { SvgIconComponent } from "@mui/icons-material";

import "./InsightSection.scss";

export interface InsightConfig {
  title: string;
  subtitle: string;
  color: string;
  icon: SvgIconComponent;
}

interface InsightSectionProps {
  config: InsightConfig;
  items: string[];
}

const InsightSection = ({ config, items }: InsightSectionProps) => {
  const Icon = config.icon;

  return (
    <Card className="insight-section" elevation={0}>
      <CardContent>
        <Typography variant="h5" className="insight-section__title">
          {config.title}
        </Typography>

        <Typography className="insight-section__subtitle">
          {config.subtitle}
        </Typography>

        {items.length > 0 ? (
          <ul className="insight-section__list">
            {items.map((item, index) => (
              <li key={index}>
                <Icon
                  sx={{
                    color: config.color,
                  }}
                />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Typography className="insight-section__empty">
            No insights available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightSection;
