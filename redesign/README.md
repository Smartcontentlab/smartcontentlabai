# SmartContent Lab redesign

This is the public showcase website exported from the Replit app.

## Development

Use Node 22 and pnpm 10.26.1.

    pnpm install --frozen-lockfile
    pnpm dev

## Production build

    pnpm run build

Netlify reads the repository-root netlify.toml, builds in redesign/, and
serves redesign/dist/public. Existing legacy site files are preserved.

This pull request does not include a client platform, database, contracts,
CRM automation, or payment integration. The audit form opens an email draft;
it does not claim to save a submission. Booking uses the existing booking link.

No secrets or environment variables are required for this showcase.
Review a Netlify Deploy Preview before merging into the production branch.
