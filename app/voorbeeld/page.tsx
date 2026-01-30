'use client';

import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  distanceBasedSection,
  infoBanner,
  notesSection,
  timeBasedSection,
  voorbeeldCta,
  voorbeeldHeader,
  voorbeeldTijd,
} from "@/content/voorbeelden";

export default function VoorbeeldPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {voorbeeldHeader.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {voorbeeldHeader.introPrefix}
          <span className="font-semibold text-foreground">{voorbeeldTijd}</span>
          {voorbeeldHeader.introSuffix}
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-8 rounded-lg border border-primary/30 bg-accent p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-foreground">{infoBanner.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {infoBanner.textPrefix}
              {voorbeeldTijd}
              {infoBanner.textSuffix}
              <Link
                href={infoBanner.linkHref}
                className="font-medium text-primary hover:underline"
              >
                {infoBanner.linkLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Time-based Intervals */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{timeBasedSection.title}</CardTitle>
          <CardDescription>{timeBasedSection.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">
                    {timeBasedSection.tableHeaders.workout}
                  </TableHead>
                  <TableHead className="font-semibold">
                    {timeBasedSection.tableHeaders.structure}
                  </TableHead>
                  <TableHead className="font-semibold">
                    {timeBasedSection.tableHeaders.targetPace}
                  </TableHead>
                  <TableHead className="font-semibold">
                    {timeBasedSection.tableHeaders.recovery}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeBasedSection.rows.map((interval) => (
                  <TableRow key={interval.workout}>
                    <TableCell className="font-medium">{interval.workout}</TableCell>
                    <TableCell>{interval.structure}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{interval.targetPace}</span>
                        <span className="text-sm text-muted-foreground">{interval.paceNote}</span>
                      </div>
                    </TableCell>
                    <TableCell>{interval.recovery}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Distance-based Intervals */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{distanceBasedSection.title}</CardTitle>
          <CardDescription>{distanceBasedSection.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">
                    {distanceBasedSection.tableHeaders.workout}
                  </TableHead>
                  <TableHead className="font-semibold">
                    {distanceBasedSection.tableHeaders.structure}
                  </TableHead>
                  <TableHead className="font-semibold">
                    {distanceBasedSection.tableHeaders.targetPace}
                  </TableHead>
                  <TableHead className="font-semibold">
                    {distanceBasedSection.tableHeaders.recovery}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distanceBasedSection.rows.map((interval) => (
                  <TableRow key={interval.workout}>
                    <TableCell className="font-medium">{interval.workout}</TableCell>
                    <TableCell>{interval.structure}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{interval.targetPace}</span>
                        <span className="text-sm text-muted-foreground">{interval.paceNote}</span>
                      </div>
                    </TableCell>
                    <TableCell>{interval.recovery}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>{notesSection.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {notesSection.items.map((note, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{note}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <p className="text-muted-foreground">
          {voorbeeldCta.text}
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href={voorbeeldCta.button.href}>
            {voorbeeldCta.button.label}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
