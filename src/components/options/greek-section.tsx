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
    <CardHeader className="cursor-pointer" onClick={onToggle}>
      <CardTitle className="text-sm flex justify-between items-center">
        <span>{title}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </CardTitle>
    </CardHeader>
    {isOpen && (
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription className="text-lg">{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
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
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
        {controlElement}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
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