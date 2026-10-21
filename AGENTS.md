# Architecture rules
- Keep partner affiliations, bilingual descriptions and public research evidence in a single browser-safe data module shared by the partners page and blueprint exporter, so both stay consistent.
- Vercel deployments use Nitro's Vercel preset and root Routing Middleware on every path, including static bundles and documents, because client rendering gates cannot protect confidential files.
- Validate site credentials only on the server and use signed HttpOnly same-origin session cookies; never place passwords or unlock flags in browser code/storage.