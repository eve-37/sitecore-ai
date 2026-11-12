'use client';

import { useEffect, useRef, useState, type JSX } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { StatHighlightsProps, StatItem } from './stat-highlights.props';

const COUNT_DURATION_MS = 1200;

type ParsedValue = {
  prefix: string;
  number: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
};

/** Splits "1,200+" into prefix "", number 1200, suffix "+". Returns null for non-numeric values. */
const parseValue = (raw: string): ParsedValue | null => {
  const match = raw.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numeric, suffix] = match;
  const decimals = numeric.includes('.') ? numeric.split('.')[1].length : 0;
  return {
    prefix,
    number: Number(numeric.replace(/,/g, '')),
    decimals,
    grouped: numeric.includes(','),
    suffix,
  };
};

const formatValue = (parsed: ParsedValue, current: number): string => {
  const number = current.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.grouped,
  });
  return `${parsed.prefix}${number}${parsed.suffix}`;
};

/** Counts the number up once when it scrolls into view. Shows the final value if motion is reduced. */
const CountUp = ({ value }: { value: string }): JSX.Element => {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!parsed || !element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    setDisplay(formatValue(parsed, 0));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(formatValue(parsed, parsed.number * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // Re-run only when the authored value changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
};

const Stat = ({ stat, isEditing }: { stat: StatItem; isEditing: boolean }): JSX.Element => {
  const value = stat.fields.Value?.value ?? '';

  return (
    <li className="flex flex-col gap-2 border-t-2 border-current pt-6">
      <span className="font-heading text-5xl font-normal leading-none tracking-tight tabular-nums md:text-6xl">
        {isEditing ? <Text field={stat.fields.Value} /> : <CountUp value={value} />}
      </span>
      <Text tag="span" field={stat.fields.Label} className="text-base leading-snug opacity-80" />
    </li>
  );
};

/**
 * StatHighlights: a heading, short intro and a row of key figures that count up on scroll.
 * Stats are separate Stat items selected in the datasource's Stats (Treelist) field.
 */
export const Default = (props: StatHighlightsProps): JSX.Element => {
  const { fields, params, page } = props;

  if (!fields) {
    return <NoDataFallback componentName="StatHighlights" />;
  }

  const isEditing = page?.mode?.isEditing ?? false;
  const stats = fields.Stats ?? [];
  const sectionClasses = [
    'component',
    'stat-highlights',
    'w-full',
    'py-16',
    'md:py-24',
    params?.styles,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses} id={params?.RenderingIdentifier || undefined}>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex max-w-2xl flex-col gap-4">
          <Text
            tag="h2"
            field={fields.Heading}
            className="font-heading text-3xl font-normal leading-tight tracking-tight text-pretty md:text-4xl"
          />
          <Text tag="p" field={fields.Intro} className="text-lg leading-relaxed" />
        </div>

        {stats.length > 0 ? (
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Stat key={stat.id ?? index} stat={stat} isEditing={isEditing} />
            ))}
          </ul>
        ) : (
          isEditing && (
            <p className="text-base opacity-70">
              Select Stat items in the Stats field to show figures here.
            </p>
          )
        )}
      </div>
    </section>
  );
};
