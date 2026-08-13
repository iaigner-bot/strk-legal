# STRK — legal documents

The privacy policy and terms of service for the STRK app, published to GitHub
Pages so App Store Connect and Google Play have a reachable URL.

- [Privacy Policy](https://iaigner-bot.github.io/strk-legal/privacy-policy.html)
- [Terms of Service](https://iaigner-bot.github.io/strk-legal/terms-of-service.html)

## This is a mirror

The source of truth is the STRK app repository, where a CI gate holds these
documents in sync with the screens shown inside the app — a policy that
contradicts the app is worse than no policy. **Edit them there, then re-run the
sync**; editing here creates exactly the disagreement that gate exists to
prevent.

## Rebuilding locally

```
node build.mjs      # writes _site/
```
