// Interfaces consumed by the daily cycle from the providers' JavaScript exports.
declare module "@lenticule-science/divining/astrology" {
  export type Body = "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto";
  export type Chart = Readonly<{
    bodies: Record<Body, { longitude: number; speed: number }>;
    provenance: { algorithm: string };
  }>;
  export type SignPlacement = { sign: { name: string; element: string } };
  export type Lunation = { phase: string; trend: string; illuminatedFraction: number; elongation: number };
  export type IngressEvent = { body: Body; time: string; from: { name: string }; to: { name: string }; direction: "increasing" | "decreasing" };
  export type AspectHit = { bodyA: Body; bodyB: Body; aspect: { name: string; angle: number }; offset: number; separation: number; phase: string };
  export const BODIES: readonly Body[];
  export function computeChart(time: string): Chart;
  export function signPlacement(longitude: number): SignPlacement;
  export function lunationOf(bodies: { sun: { longitude: number }; moon: { longitude: number } }): Lunation;
  export function aspectsInChart(bodies: Chart["bodies"]): readonly AspectHit[];
  export function findIngresses(body: Body, start: string, end: string): readonly IngressEvent[];
  export function findExactAspects(a: Body, b: Body, angle: number, start: string, end: string): readonly { time: string }[];
}

declare module "@lenticule-science/divining/divination" {
  import type { AspectHit, Body, Lunation, SignPlacement } from "@lenticule-science/divining/astrology";
  type Card = { name: string };
  export type Spread = Readonly<{
    spread: string; date: string; provenance: { method: string; seed?: string };
    positions: readonly { position: string; card: Card; orientation: "upright" | "reversed" }[];
  }>;
  export type DateReduction = Readonly<{ date: string; steps: readonly number[]; value: number; kind: "simple" | "master" }>;
  export type SynthesizedSignal = Readonly<{
    kind: "dream" | "historical-echo" | "elemental-signature" | "metaphor-object" | "color-tone";
    text: string; synthesizer: string;
  }>;
  export type FeaturedMotion =
    | { kind: "aspect"; aspect: AspectHit; exactTime?: string }
    | { kind: "ingress"; ingress: { body: Body; time: string; signTo: { name: string }; signFrom: { name: string }; direction: "direct" | "retrograde" } };
  export type DailyIndicators = Readonly<{
    date: string; chartTime: string; motion: FeaturedMotion; moon: { placement: SignPlacement; lunation: Lunation };
    tarot: Spread; numerology: DateReduction; signals: readonly SynthesizedSignal[];
  }>;
  export const TAROT_DECK: readonly Card[];
  export function dailySpread(date: string, salt: string): Spread;
  export function reduceDate(date: string): DateReduction;
}

declare module "@lenticule-science/divining/divination/codecs/indicators" {
  import type { DailyIndicators } from "@lenticule-science/divining/divination";
  export type DailyIndicatorsRecord = DailyIndicators;
  export function encodeDailyIndicators(record: DailyIndicatorsRecord): string;
  export function decodeDailyIndicators(text: string): DailyIndicatorsRecord;
  export function renderIndicatorsBrief(record: DailyIndicatorsRecord): string;
}
declare module "@lenticule-science/divining/divination/codecs/spread" {
  import type { Spread } from "@lenticule-science/divining/divination";
  export function encodeSpreadDocument(document: { spread: Spread; body: string }): string;
}
declare module "@lenticule-science/divining/divination/codecs/glyph" {
  import type { Chart } from "@lenticule-science/divining/astrology";
  export function renderChartGlyphs(bodies: Chart["bodies"]): string;
}
declare module "@red-cup-engineering/create-hive-post-draft-service" {
  type Draft = import("../hive-draft.ts").HiveDraftPayload;
  export function createHivePostDraft(input: Pick<Draft, "account" | "title" | "body" | "tags" | "imagePath"> & { dateIso: string }): Draft;
}
