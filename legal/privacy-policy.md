# STRK — Privacy Policy

_Last updated: August 11, 2026_

> **Publishing note.** App Store Connect and Google Play both require a *publicly
> reachable* privacy policy URL; an in-app screen does not satisfy that. This file is
> the hostable mirror of `app/legal/privacy.tsx`. **If you change one, change both** —
> a policy that contradicts the app is worse than no policy.
> Easiest host: commit this to a public repo, enable GitHub Pages, and use the
> resulting `https://<user>.github.io/<repo>/legal/privacy-policy` URL.

STRK is built to run entirely on your device. There is no STRK server or account system —
the sections below explain exactly what data exists, where it lives, and who (if anyone)
can see it.

## What stays on your device

Your profile, workout history, nutrition logs, STRK Rating, streaks, personal records, and
app settings are stored locally on your device using standard iOS/Android app storage. None
of this is uploaded to a server, because STRK doesn't operate one. Deleting the app, or
using Delete Account in Settings, permanently erases this data from your device.

## Camera & photo library

STRK asks for camera access to scan food barcodes, and for photo library access to set a
profile picture. Camera frames are processed on-device and are never uploaded or stored —
scanning a barcode sends only the barcode number itself.

## Food lookups (OpenFoodFacts)

STRK contacts [OpenFoodFacts](https://world.openfoodfacts.org), a free open-data food
database, in two situations. When you scan a barcode, it sends that barcode number. When you
tap "Search OpenFoodFacts" in the food search, it sends the words you typed and the food
region set in Settings — a country, never your location. Nothing else is sent in either
case: no photo, no account identifier, no device identifier. Searching is never automatic;
STRK only contacts them when you tap that row, and typing alone searches the on-device list.
If nothing is found, STRK tells you so rather than guessing. Their data is published under
the Open Database License, and their own privacy policy is at openfoodfacts.org.

## Location & GPS routes

If you record a run, ride or walk with GPS, STRK reads your location only while
you are recording, in the foreground, to measure distance and pace. The route is
stored on your device with the rest of your training history and is never
uploaded — there is no STRK server. Deleting the session, or using Delete
Account, erases it. Manually logged cardio sessions use no location access at
all.

## Imported files

If you import a GPX or CSV export from another app, STRK reads the file
on-device, shows you what it found, and writes nothing until you confirm. The
file's contents stay on your device like everything else.

## Sign in with Apple or Google

If you use "Continue with Apple" or "Continue with Google," that provider shares a user
identifier and, if you choose to share them, your name and email. STRK uses these only to
gate access to your own on-device data — they are stored locally on your device and never
transmitted to any STRK server, because none exists.

## Email accounts

If you create an account with an email and password instead, the password is hashed and
stored locally on your device to unlock your local data — it is not sent to, or verified
against, any server, because STRK has no backend.

## Notifications

STRK schedules local notifications on your device (for example, a daily rating settlement or
streak reminder). These are generated and delivered entirely on-device and do not involve a
push notification server.

## What STRK does not do

STRK does not run analytics or tracking SDKs, does not sell or share your data with third
parties, and does not use your data for advertising.

## Deleting your account & data

Delete Account in Settings wipes every store back to a fresh-install state on this device.
Since there is no server-side copy, this is a complete and permanent deletion of your STRK
account and data. It cannot be undone.

## Contact

Questions about this policy can be sent to **support@strk.uk**.
