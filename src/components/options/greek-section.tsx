"use client";

import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AccordionSectionProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionSection = ({ title, content, isOpen, onToggle }: AccordionSectionProps) => (
  <Card>
    <CardHeader className="cursor-pointer py-3 md:py-4" onClick={onToggle}>
      <CardTitle className="text-xs md:text-sm flex justify-between items-center">
        <span className="leading-tight">{title}</span>
        <span className={`transform transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </CardTitle>
    </CardHeader>
    {isOpen && (
      <CardContent className="pt-0">
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{content}</p>
      </CardContent>
    )}
  </Card>
);

interface GreekSectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  chartTitle: string;
  chartData: any;
  chartOptions: any;
  controlElement: React.ReactNode;
  accordionData: Array<{
    title: string;
    content: string;
    key: string;
  }>;
  accordionStates: { [key: string]: boolean };
  onAccordionToggle: (key: string) => void;
  leftSide?: boolean; // Whether content should be on left side
}

export const GreekSection = ({
  icon,
  title,
  subtitle,
  description,
  chartTitle,
  chartData,
  chartOptions,
  controlElement,
  accordionData,
  accordionStates,
  onAccordionToggle,
  leftSide = true
}: GreekSectionProps) => {
  const contentSide = (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
            <span className="flex-shrink-0">{icon}</span>
            <span>{title}</span>
          </CardTitle>
          <CardDescription className="text-base md:text-lg leading-tight">{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      <div className="space-y-2 md:space-y-3">
        {accordionData.map((accordion) => (
          <AccordionSection
            key={accordion.key}
            title={accordion.title}
            content={accordion.content}
            isOpen={accordionStates[accordion.key] || false}
            onToggle={() => onAccordionToggle(accordion.key)}
          />
        ))}
      </div>
    </div>
  );

  const chartSide = (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-lg md:text-xl">{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        <div className="relative h-[250px] md:h-[300px] lg:h-[350px]">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="pt-2">
          {controlElement}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-start">
      {leftSide ? (
        <>
          {contentSide}
          {chartSide}
        </>
      ) : (
        <>
          {chartSide}
          {contentSide}
        </>
      )}
    </div>
  );
}; 