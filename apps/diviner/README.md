# Routine Read diviner

The daily diviner cycle for Cassia Lorne's *Routine Read*: atomic divinations, then a synthesis under gates, into the
reviewable content store this section keeps. It reads the section's [`diviner.config.json`](../../diviner.config.json),
[readings](../../content/) and [editorial files](../../backstage/).

It came from the archived `red-cup-engineering/cassia-lorne-substack-com` repository (at `927ec91`), which had received it
on 2026-10-24 from `causeway-services/cassia-lorne-substack-com@e3cc9c50bd1d3408a90d1f6a8fd761a7ffc41000`.

Code that reads the section's data takes its location from the `SECTION_DATA_ROOT` environment variable (default: the
current working directory). Set it to this section's checkout before running the daily cycle.

The TypeScript implementation also incorporates the feature-motion calculations, image-aware Hive drafts and front-matter reader from the [former Red Cup Substack extraction](https://github.com/red-cup-engineering/substack-engineering-services-section/tree/7a5e38f7bcdfdc13231bda6e6ebacbe81237b677/src). The historical TypeScript feed mill remains in `src/mill.ts`. It requires the retired content-mill and newswire packages and is independent of the daily reading and Hive draft commands.

## Check the TypeScript source

With the declared TypeScript and Node development types installed, run `npm run check`. The strict check covers the daily reading, gates, image and Hive draft code. The historical feed mill has its own retired dependencies. The consumer interfaces in `src/types/providers.d.ts` describe the fields these stages use from their JavaScript providers.

Bare Cedar Fog already carries the compiler and Node declarations in its LAGOON package store. From the workspace root, the same check can run without a separate install:

```sh
tools="$PWD/data/state/package-store-state/project/node_modules"
cassia="$PWD/services/public-services-section/services/public-content-services-section/services/public-media-services-section/services/public-media-personality-services-section/services/cassia-lorne-services-section/services/cassia-lorne-web-services-section/services/cassia-lorne-web-newsletter-services-section/services/cassia-lorne-substack-services-section/apps/diviner"
PATH="$tools/.bin:$PATH" npm --prefix "$cassia" run check -- --typeRoots "$tools/.pnpm/node_modules/@types"
```
