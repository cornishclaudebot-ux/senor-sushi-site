# Señor Sushi Phoenix — site rebuild

Rebuild of senorsushiphoenix.com on the house immersive system (The 44 build, token-remapped).
Built 2026-07-29 as part of the Apex complimentary-website pipeline. DRAFT: local only, not deployed.

## Run it

Preview server is registered in ~/.claude/launch.json as `senorsushi` on port 4334:

    python3 -m http.server 4334 --directory ~/senor-sushi-site

## What is real (everything)

- Menu: transcribed item-by-item from the 8 menu scans on their live Wix site (assets/pull/menu).
- Photos: their own photography pulled from the Wix media CDN at full res (assets/pull holds originals).
  Card crops remove the baked-in name labels (bottom 130px).
- Hours: consensus of Yelp, Restaurantji, NetWaiter, Restaurant Guru, Uber Eats (read 2026-07-29):
  Sun-Thu 11-10, Fri-Sat 11-11. Happy hour Mon-Fri 2-7 from the printed menu.
- Ordering links: all verified live against 4324 W Indian School Rd on 2026-07-29
  (Grubhub, Uber Eats, DoorDash delivery-only, Postmates, Seamless, NetWaiter direct).
- Story: founded 2012 by chef Eduardo Gonzalez (their Grubhub blurb + Yelp owner info);
  Culichi/Sinaloa context per Wikipedia + Phoenix New Times.
- Social proof: FB 84% recommend / 4,079 reviews and follower counts read directly 2026-07-29.

## Deploy (when Aiden says go)

GitHub Pages from committed state, same as the44.live. Point their domain
(senorsushiphoenix.com, currently Wix) via CNAME after his call.

## File shape (house system)

index.html / menu.html / specials.html / contact.html
styles.css (tokens at top) · app.js (CONFIG at top, injects nav+footer) · fx-sunroll.js (the one payoff)
Governing metaphor: the roll is the rising sun.
