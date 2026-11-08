# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browser\privacy-phase1.spec.ts >> JavaScript disabled leaves Google off and privacy/retailer links native
- Location: tests\browser\privacy-phase1.spec.ts:74:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-product-purchase] a')
Expected: "https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20"
Error: strict mode violation: locator('[data-product-purchase] a') resolved to 2 elements:
    1) <a data-astro-cid-5em2qhfi="" href="/affiliate-disclosure/">Full disclosure</a> aka getByRole('link', { name: 'Full disclosure' }).first()
    2) <a target="_blank" data-marketplace="ca" data-affiliate-click="" class="btn btn--primary" data-merchant="amazon-ca" data-astro-cid-awtibqwi="" data-product="midland-er310" rel="sponsored nofollow noopener" data-cta-placement="profile-summary" data-product-name="Midland ER310 emergency radio" href="https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20">…</a> aka getByRole('link', { name: 'View on Amazon.ca (affiliate' }).first()

Call log:
  - Expect "toHaveAttribute" locator('[data-product-purchase] a') with timeout 5000ms
  - waiting for locator('[data-product-purchase] a')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "ApocalypseGearLab home" [ref=e6] [cursor=pointer]:
          - /url: /
          - generic [ref=e8]: ApocalypseGearLab
        - generic [ref=e9]: EQUIPMENT INTELLIGENCE / FOUR SECTORS
        - group [ref=e10]:
          - generic "Choose language" [ref=e11] [cursor=pointer]:
            - generic [aria-hidden] [ref=e12]: ◎
            - generic [ref=e13]: English
            - generic [aria-hidden] [ref=e14]: ⌄
      - navigation "Primary" [ref=e15]:
        - list [ref=e16]:
          - listitem [ref=e17]:
            - link "Home" [ref=e18] [cursor=pointer]:
              - /url: /
          - listitem [ref=e19]:
            - link "All gear" [ref=e20] [cursor=pointer]:
              - /url: /gear/
            - button "Browse equipment categories" [ref=e21] [cursor=pointer]
          - listitem [ref=e24]:
            - link "Blackout" [ref=e25] [cursor=pointer]:
              - /url: /blackout/
          - listitem [ref=e26]:
            - link "Fallout" [ref=e27] [cursor=pointer]:
              - /url: /fallout/
          - listitem [ref=e28]:
            - link "Outbreak" [ref=e29] [cursor=pointer]:
              - /url: /outbreak/
          - listitem [ref=e30]:
            - link "Whiteout" [ref=e31] [cursor=pointer]:
              - /url: /whiteout/
          - listitem [ref=e32]:
            - link "Guides" [ref=e33] [cursor=pointer]:
              - /url: /how-we-research/
        - generic [ref=e34]:
          - generic [ref=e35]:
            - generic [ref=e36]: EXPLORE THE EQUIPMENT INDEX
            - generic [ref=e37]: 32 categories · Documented profiles, practical limits
          - generic [ref=e38]:
            - generic [ref=e39]:
              - link "Blackout" [ref=e41] [cursor=pointer]:
                - /url: /blackout/
                - text: 01Blackout
              - generic [ref=e42]:
                - paragraph [ref=e43]: Stay powered. Stay connected.
                - list [ref=e44]:
                  - listitem [ref=e45]:
                    - link "Emergency power stations 5 profiles" [ref=e46] [cursor=pointer]:
                      - /url: /gear/#category-power-stations
                      - generic [ref=e47]: Emergency power stations
                      - generic "5 profiles" [ref=e48]: "05"
                  - listitem [ref=e49]:
                    - link "Solar generators and panels 1 profiles" [ref=e50] [cursor=pointer]:
                      - /url: /gear/#category-solar
                      - generic [ref=e51]: Solar generators and panels
                      - generic "1 profiles" [ref=e52]: "01"
                  - listitem [ref=e53]:
                    - link "Portable battery banks 1 profiles" [ref=e54] [cursor=pointer]:
                      - /url: /gear/#category-battery-banks
                      - generic [ref=e55]: Portable battery banks
                      - generic "1 profiles" [ref=e56]: "01"
                  - listitem [ref=e57]:
                    - link "Emergency lighting 3 profiles" [ref=e58] [cursor=pointer]:
                      - /url: /gear/#category-lighting
                      - generic [ref=e59]: Emergency lighting
                      - generic "3 profiles" [ref=e60]: "03"
                  - listitem [ref=e61]:
                    - link "Weather radios 1 profiles" [ref=e62] [cursor=pointer]:
                      - /url: /gear/#category-weather-radios
                      - generic [ref=e63]: Weather radios
                      - generic "1 profiles" [ref=e64]: "01"
                  - listitem [ref=e65]:
                    - link "Backup communication 1 profiles" [ref=e66] [cursor=pointer]:
                      - /url: /gear/#category-backup-comms
                      - generic [ref=e67]: Backup communication
                      - generic "1 profiles" [ref=e68]: "01"
                  - listitem [ref=e69]:
                    - link "Home power outage preparedness 1 profiles" [ref=e70] [cursor=pointer]:
                      - /url: /gear/#category-home-outage-planning
                      - generic [ref=e71]: Home power outage preparedness
                      - generic "1 profiles" [ref=e72]: "01"
                  - listitem [ref=e73]:
                    - link "Portable refrigeration & freezers 2 profiles" [ref=e74] [cursor=pointer]:
                      - /url: /gear/#category-portable-refrigeration
                      - generic [ref=e75]: Portable refrigeration & freezers
                      - generic "2 profiles" [ref=e76]: "02"
                  - listitem [ref=e77]:
                    - link "Temperature monitoring & food preservation 1 profiles" [ref=e78] [cursor=pointer]:
                      - /url: /gear/#category-temperature-monitoring
                      - generic [ref=e79]: Temperature monitoring & food preservation
                      - generic "1 profiles" [ref=e80]: "01"
                  - listitem [ref=e81]:
                    - link "Rechargeable batteries & charging accessories 2 profiles" [ref=e82] [cursor=pointer]:
                      - /url: /gear/#category-rechargeable-batteries
                      - generic [ref=e83]: Rechargeable batteries & charging accessories
                      - generic "2 profiles" [ref=e84]: "02"
            - generic [ref=e85]:
              - link "Fallout" [ref=e87] [cursor=pointer]:
                - /url: /fallout/
                - text: 02Fallout
              - generic [ref=e88]:
                - paragraph [ref=e89]: Prepare the essentials.
                - list [ref=e90]:
                  - listitem [ref=e91]:
                    - link "Water storage and purification 2 profiles" [ref=e92] [cursor=pointer]:
                      - /url: /gear/#category-water
                      - generic [ref=e93]: Water storage and purification
                      - generic "2 profiles" [ref=e94]: "02"
                  - listitem [ref=e95]:
                    - link "Emergency food storage 1 profiles" [ref=e96] [cursor=pointer]:
                      - /url: /gear/#category-food-storage
                      - generic [ref=e97]: Emergency food storage
                      - generic "1 profiles" [ref=e98]: "01"
                  - listitem [ref=e99]:
                    - link "Emergency food rations 2 profiles" [ref=e100] [cursor=pointer]:
                      - /url: /gear/#category-food-rations
                      - generic [ref=e101]: Emergency food rations
                      - generic "2 profiles" [ref=e102]: "02"
                  - listitem [ref=e103]:
                    - link "Radiation detection 2 profiles" [ref=e104] [cursor=pointer]:
                      - /url: /gear/#category-radiation-detection
                      - generic [ref=e105]: Radiation detection
                      - generic "2 profiles" [ref=e106]: "02"
                  - listitem [ref=e107]:
                    - link "Emergency repair tools 1 profiles" [ref=e108] [cursor=pointer]:
                      - /url: /gear/#category-tools
                      - generic [ref=e109]: Emergency repair tools
                      - generic "1 profiles" [ref=e110]: "01"
                  - listitem [ref=e111]:
                    - link "First aid supplies 1 profiles" [ref=e112] [cursor=pointer]:
                      - /url: /gear/#category-first-aid
                      - generic [ref=e113]: First aid supplies
                      - generic "1 profiles" [ref=e114]: "01"
                  - listitem [ref=e115]:
                    - link "Emergency shelter 1 profiles" [ref=e116] [cursor=pointer]:
                      - /url: /gear/#category-shelter
                      - generic [ref=e117]: Emergency shelter
                      - generic "1 profiles" [ref=e118]: "01"
                  - listitem [ref=e119]:
                    - link "Emergency hygiene & sanitation 1 profiles" [ref=e120] [cursor=pointer]:
                      - /url: /gear/#category-hygiene-sanitation
                      - generic [ref=e121]: Emergency hygiene & sanitation
                      - generic "1 profiles" [ref=e122]: "01"
                  - listitem [ref=e123]:
                    - link "Exploration & metal detection 1 profiles" [ref=e124] [cursor=pointer]:
                      - /url: /gear/#category-metal-detection
                      - generic [ref=e125]: Exploration & metal detection
                      - generic "1 profiles" [ref=e126]: "01"
            - generic [ref=e127]:
              - link "Outbreak" [ref=e129] [cursor=pointer]:
                - /url: /outbreak/
                - text: 03Outbreak
              - generic [ref=e130]:
                - paragraph [ref=e131]: Pack for the unknown.
                - list [ref=e132]:
                  - listitem [ref=e133]:
                    - link "Evacuation backpacks 1 profiles" [ref=e134] [cursor=pointer]:
                      - /url: /gear/#category-tactical-backpacks
                      - generic [ref=e135]: Evacuation backpacks
                      - generic "1 profiles" [ref=e136]: "01"
                  - listitem [ref=e137]:
                    - link "Respiratory protection 6 profiles" [ref=e138] [cursor=pointer]:
                      - /url: /gear/#category-respiratory-protection
                      - generic [ref=e139]: Respiratory protection
                      - generic "6 profiles" [ref=e140]: "06"
                  - listitem [ref=e141]:
                    - link "Protective eyewear 1 profiles" [ref=e142] [cursor=pointer]:
                      - /url: /gear/#category-protective-eyewear
                      - generic [ref=e143]: Protective eyewear
                      - generic "1 profiles" [ref=e144]: "01"
                  - listitem [ref=e145]:
                    - link "Protective work gloves 1 profiles" [ref=e146] [cursor=pointer]:
                      - /url: /gear/#category-work-gloves
                      - generic [ref=e147]: Protective work gloves
                      - generic "1 profiles" [ref=e148]: "01"
                  - listitem [ref=e149]:
                    - link "Hiking footwear 1 profiles" [ref=e150] [cursor=pointer]:
                      - /url: /gear/#category-hiking-footwear
                      - generic [ref=e151]: Hiking footwear
                      - generic "1 profiles" [ref=e152]: "01"
                  - listitem [ref=e153]:
                    - link "Rain shells 1 profiles" [ref=e154] [cursor=pointer]:
                      - /url: /gear/#category-rainwear
                      - generic [ref=e155]: Rain shells
                      - generic "1 profiles" [ref=e156]: "01"
                  - listitem [ref=e157]:
                    - link "Satellite navigation and communication 1 profiles" [ref=e158] [cursor=pointer]:
                      - /url: /gear/#category-satellite-navigation
                      - generic [ref=e159]: Satellite navigation and communication
                      - generic "1 profiles" [ref=e160]: "01"
                  - listitem [ref=e161]:
                    - link "Outdoor & survival knives 3 profiles" [ref=e162] [cursor=pointer]:
                      - /url: /gear/#category-fixed-blade-knives
                      - generic [ref=e163]: Outdoor & survival knives
                      - generic "3 profiles" [ref=e164]: "03"
                  - listitem [ref=e165]:
                    - link "Optics & observation 1 profiles" [ref=e166] [cursor=pointer]:
                      - /url: /gear/#category-optics-observation
                      - generic [ref=e167]: Optics & observation
                      - generic "1 profiles" [ref=e168]: "01"
            - generic [ref=e169]:
              - link "Whiteout" [ref=e171] [cursor=pointer]:
                - /url: /whiteout/
                - text: 04Whiteout
              - generic [ref=e172]:
                - paragraph [ref=e173]: Insulate. Stay dry. Plan shelter.
                - list [ref=e174]:
                  - listitem [ref=e175]:
                    - link "Winter sleeping pads & insulation 1 profiles" [ref=e176] [cursor=pointer]:
                      - /url: /gear/#category-winter-sleep-systems
                      - generic [ref=e177]: Winter sleeping pads & insulation
                      - generic "1 profiles" [ref=e178]: "01"
                  - listitem [ref=e179]:
                    - link "Winter gloves & mitts 2 profiles" [ref=e180] [cursor=pointer]:
                      - /url: /gear/#category-winter-gloves-mitts
                      - generic [ref=e181]: Winter gloves & mitts
                      - generic "2 profiles" [ref=e182]: "02"
                  - listitem [ref=e183]:
                    - link "Winter headwear & face layers 2 profiles" [ref=e184] [cursor=pointer]:
                      - /url: /gear/#category-winter-headwear
                      - generic [ref=e185]: Winter headwear & face layers
                      - generic "2 profiles" [ref=e186]: "02"
                  - listitem [ref=e187]:
                    - link "Snow goggles & lens selection 1 profiles" [ref=e188] [cursor=pointer]:
                      - /url: /gear/#category-snow-goggles
                      - generic [ref=e189]: Snow goggles & lens selection
                      - generic "1 profiles" [ref=e190]: "01"
            - generic [ref=e191]:
              - generic [ref=e192]: Discover
              - generic [ref=e194]:
                - paragraph [ref=e195]: Build a plan before a kit.
                - list [ref=e196]:
                  - listitem [ref=e197]:
                    - link "How we research" [ref=e198] [cursor=pointer]:
                      - /url: /how-we-research/
                      - text: How we research
                      - generic [aria-hidden] [ref=e199]: ↗
                  - listitem [ref=e200]:
                    - link "Blackout planning guide" [ref=e201] [cursor=pointer]:
                      - /url: /blackout/#sector-guide
                  - listitem [ref=e202]:
                    - link "Fallout planning guide" [ref=e203] [cursor=pointer]:
                      - /url: /fallout/#sector-guide
                  - listitem [ref=e204]:
                    - link "Outbreak planning guide" [ref=e205] [cursor=pointer]:
                      - /url: /outbreak/#sector-guide
                  - listitem [ref=e206]:
                    - link "Whiteout planning guide" [ref=e207] [cursor=pointer]:
                      - /url: /whiteout/#sector-guide
                - paragraph [ref=e208]: Specifications. Sources. Limitations.Equipment research for informed preparation.
          - generic [ref=e209]:
            - generic [aria-hidden] [ref=e210]: + PREPAREDNESS BEGINS WITH A PLAN
            - generic [ref=e211]: Explore. Compare. Prepare.
  - main [ref=e212]:
    - article [ref=e213]:
      - navigation "Breadcrumb" [ref=e214]:
        - list [ref=e215]:
          - listitem [ref=e216]:
            - link "Home" [ref=e217] [cursor=pointer]:
              - /url: /
          - listitem [ref=e218]:
            - text: /
            - link "Blackout" [ref=e219] [cursor=pointer]:
              - /url: /blackout/
          - listitem [ref=e220]: / Midland ER310 emergency radio
      - paragraph [ref=e221]:
        - strong [ref=e222]: Informational profile.
        - text: The retailer link uses the recorded ASIN. The current listing, seller and package have not been independently verified. This is not a hands-on review, certification claim or purchase recommendation.
      - paragraph [ref=e223]: Weather radios · Midland · ER310
      - heading "Midland ER310 emergency radio" [level=1] [ref=e224]
      - paragraph [ref=e225]: An AM/FM emergency radio with rechargeable, AA, hand-crank and supplementary solar power options. Canadian Weatheradio coverage is no longer available.
      - paragraph [ref=e226]:
        - generic [ref=e227]: Not physically tested by us
        - generic [ref=e228]: Sources checked 2026-10-29
      - generic [ref=e229]:
        - paragraph [ref=e230]:
          - strong [ref=e231]: Information only.
          - text: Manufacturer sources cited. Listing documented by owner.
        - paragraph [ref=e232]: Editorial verification incomplete.
        - paragraph [ref=e233]: Manufacturer specifications describe the documented model; they do not authenticate the current retailer offer or supplied unit. The listing evidence comes from the owner, not an independent inspection of the current offer.
        - paragraph [ref=e234]: Amazon.ca link available. Product-specific safety review remains incomplete; read the limitations below.
      - region [ref=e235]:
        - heading "Where to buy" [level=2] [ref=e236]
        - complementary "Affiliate disclosure" [ref=e237]:
          - paragraph [ref=e238]:
            - text: As an Amazon Associate I earn from qualifying purchases.
            - link "Full disclosure" [ref=e239] [cursor=pointer]:
              - /url: /affiliate-disclosure/
            - text: .
        - paragraph [ref=e240]:
          - link "View on Amazon.ca (affiliate link, opens in a new tab)" [ref=e241] [cursor=pointer]:
            - /url: https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20
            - text: View on Amazon.ca
            - generic [ref=e242]: (affiliate link, opens in a new tab)
      - paragraph [ref=e243]:
        - text: "Plan the task:"
        - link "plan radio power alongside lighting and phone charging" [ref=e244] [cursor=pointer]:
          - /url: /blackout/#planning-5
        - text: . Check specifications and compatible components in the exact model instructions. Read
        - link "how we research equipment" [ref=e245] [cursor=pointer]:
          - /url: /how-we-research/
        - text: .
      - figure "Concept illustration, not a product photograph. Illustrated labels are not specifications; see the documented model details." [ref=e246]:
        - img "Concept illustration of a red Midland emergency radio in an amber inventory frame" [ref=e247]
        - generic [ref=e248]:
          - text: Concept illustration, not a product photograph.
          - generic [ref=e249]: Illustrated labels are not specifications; see the documented model details.
      - generic [ref=e250]:
        - heading "Overview" [level=2] [ref=e251]
        - paragraph [ref=e252]: Keep the ER310 on the shortlist for listening to available local AM/FM broadcasts during an outage. Weather-band hardware and a working alert service are different things. Canada has discontinued Weatheradio, so a Canadian household should build its information plan around currently available services instead of assuming this radio will receive local weather alerts.
      - generic [ref=e253]:
        - heading "Documented specifications" [level=2] [ref=e254]
        - region "Midland ER310 emergency radio specifications" [ref=e255]:
          - table [ref=e256]:
            - caption [ref=e257]: Documented specifications for Midland ER310 emergency radio
            - rowgroup [ref=e258]:
              - row [ref=e259]:
                - rowheader "Broadcast bands" [ref=e260]
                - cell [ref=e261]:
                  - text: AM, FM and seven weather channels
                  - link "Source 1" [ref=e263] [cursor=pointer]:
                    - /url: "#source-midland-er310"
              - row [ref=e264]:
                - rowheader "Weather-band range" [ref=e265]
                - cell [ref=e266]:
                  - text: 162.400–162.550 MHz
                  - link "Source 1" [ref=e268] [cursor=pointer]:
                    - /url: "#source-midland-er310"
              - row [ref=e269]:
                - rowheader "Charging options" [ref=e270]
                - cell [ref=e271]:
                  - text: Micro-USB input, hand crank and built-in solar panel
                  - link "Source 1" [ref=e273] [cursor=pointer]:
                    - /url: "#source-midland-er310"
              - row [ref=e274]:
                - rowheader "Battery options" [ref=e275]
                - cell [ref=e276]:
                  - text: Rechargeable lithium-ion battery or six AA cells; AA cells are not recharged by the unit
                  - link "Source 1" [ref=e278] [cursor=pointer]:
                    - /url: "#source-midland-er310"
              - row [ref=e279]:
                - rowheader "Solar limitation" [ref=e280]
                - cell [ref=e281]:
                  - text: Midland says solar is supplementary and will not recharge a depleted battery by itself
                  - link "Source 2" [ref=e283] [cursor=pointer]:
                    - /url: "#source-midland-er310-faq"
      - generic [ref=e284]:
        - generic [ref=e285]:
          - heading "Advantages" [level=2] [ref=e286]
          - list [ref=e287]:
            - listitem [ref=e288]: AM/FM reception does not require a phone data connection.
            - listitem [ref=e289]: AA backup and USB charging offer alternatives to the internal battery.
        - generic [ref=e290]:
          - heading "Limitations" [level=2] [ref=e291]
          - list [ref=e292]:
            - listitem [ref=e293]: Canadian Weatheradio is no longer operating.
            - listitem [ref=e294]: Hand-crank and solar charging are not substitutes for routine USB recharging.
            - listitem [ref=e295]: The documented battery capacities differ and are not assigned to the supplied radio; no runtime or delivered capacity is guaranteed.
      - generic [ref=e296]:
        - heading "Potential uses and conditions" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]: Listen to available local AM/FM outage updates.
          - listitem [ref=e300]: Include radio charging and spare-cell checks in a household readiness routine.
      - region [ref=e301]:
        - heading "What the sources confirm" [level=2] [ref=e302]
        - paragraph [ref=e303]: These statements cite the linked sources. Manufacturer documentation and retailer representations are identified separately; they are not independent performance measurements.
        - list [ref=e304]:
          - listitem [ref=e305]:
            - text: ECCC states that Weatheradio and Hello Weather are no longer in service.
            - link "Source 3" [ref=e306] [cursor=pointer]:
              - /url: "#source-eccc-weatheradio"
          - listitem [ref=e307]:
            - text: The ER310 has AM/FM and weather-band reception; this is not the ER310PRO.
            - link "Source 1" [ref=e308] [cursor=pointer]:
              - /url: "#source-midland-er310"
          - listitem [ref=e309]:
            - text: Midland documents BATT26L as a 2600 mAh replacement for second-generation ER310. That is not evidence that the conflicting guide values describe a verified shipment change.
            - link "Source 5" [ref=e310] [cursor=pointer]:
              - /url: "#source-midland-batt26l"
      - generic [ref=e311]:
        - heading "What to check before buying" [level=2] [ref=e312]
        - list [ref=e313]:
          - listitem [ref=e314]: Recheck the ER310 / ER310-MFN red-and-black selection and supplied accessories; the recorded listing identity comes from owner-reported fields, not independent seller authentication.
          - listitem [ref=e315]: Confirm the rechargeable battery revision and the backup AA requirements of the supplied radio.
          - listitem [ref=e316]: Check which local AM/FM stations provide useful outage information; do not rely on Canadian Weatheradio alerts.
          - listitem [ref=e317]: Treat solar charging as supplementary rather than a guaranteed recharge plan.
      - generic [ref=e318]:
        - heading "Safety and compatibility notes" [level=2] [ref=e319]
        - list [ref=e320]:
          - listitem [ref=e321]: Do not promise Canadian weather-alert coverage. Reception of any available US NOAA signal is location-dependent and has not been tested.
          - listitem [ref=e322]: Manufacturer materials conflict on capacity, including within the current guide. BATT26L is documented for second-generation ER310, but this does not establish a 2600/3500 revision history or the battery shipped under this ASIN. Use only the specified Midland pack.
      - region [ref=e323]:
        - heading "Related equipment profiles" [level=2] [ref=e324]
        - paragraph [ref=e325]: These reference profiles describe documented features and unresolved limitations. They are not purchase recommendations.
        - generic [ref=e326]:
          - article [ref=e327]:
            - figure "Concept illustration, not a product photograph." [ref=e328]:
              - img "Concept illustration of a camouflage Fenix camping lantern in an amber inventory frame" [ref=e329]
            - paragraph [ref=e331]: Blackout · Emergency lighting
            - paragraph [ref=e332]: Fenix · CL26R PRO
            - heading [level=3] [ref=e333]:
              - link "Fenix CL26R Pro rechargeable lantern" [ref=e334] [cursor=pointer]:
                - /url: /gear/fenix-cl26r-pro/
            - paragraph [ref=e335]: A rechargeable lantern with area, downward and red lighting modes for shared rooms, work surfaces and a portable blackout lighting kit.
            - paragraph [ref=e336]:
              - strong [ref=e337]: "Consider:"
              - text: Output can step down as the lantern gets hot.
            - link "Product details for Fenix CL26R Pro rechargeable lantern" [ref=e338] [cursor=pointer]:
              - /url: /gear/fenix-cl26r-pro/
              - text: Product details
              - generic [ref=e339]: for Fenix CL26R Pro rechargeable lantern
            - generic [ref=e340]:
              - paragraph [ref=e341]: Amazon.ca link available
              - complementary "Affiliate disclosure" [ref=e342]:
                - paragraph [ref=e343]:
                  - text: As an Amazon Associate I earn from qualifying purchases.
                  - link "Full disclosure" [ref=e344] [cursor=pointer]:
                    - /url: /affiliate-disclosure/
                  - text: .
              - link "View on Amazon.ca (affiliate link, opens in a new tab)" [ref=e345] [cursor=pointer]:
                - /url: https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20
                - text: View on Amazon.ca
                - generic [ref=e346]: (affiliate link, opens in a new tab)
          - article [ref=e347]:
            - figure "Concept illustration, not a product photograph." [ref=e348]:
              - img "Concept illustration of a black INIU power bank with display and detachable cable in an amber frame" [ref=e349]
            - paragraph [ref=e351]: Blackout · Portable battery banks
            - paragraph [ref=e352]: INIU · P62-E1
            - heading [level=3] [ref=e353]:
              - link "INIU P62 20000 mAh 65 W power bank" [ref=e354] [cursor=pointer]:
                - /url: /gear/iniu-p62-20000mah-65w/
            - paragraph [ref=e355]: A USB-C power bank marketed at 20000 mAh and 65 W, documented by the manufacturer as P62-E1. The exact Canadian listing configuration and safety evidence remain unverified.
            - paragraph [ref=e356]: Safety verification incomplete.
            - generic [ref=e357]:
              - paragraph [ref=e358]: Amazon link pending verification
              - paragraph [ref=e359]: Exact-model safety verification is incomplete.
              - link "Details about INIU P62 20000 mAh 65 W power bank" [ref=e360] [cursor=pointer]:
                - /url: /gear/iniu-p62-20000mah-65w/
                - text: Details
                - generic [ref=e361]: about INIU P62 20000 mAh 65 W power bank
      - region [ref=e362]:
        - heading "Technical Sources & References" [level=2] [ref=e363]
        - paragraph [ref=e364]: Documentation for the specifications and limitations above. Manufacturer references and retailer identity evidence serve different purposes; these are not additional purchase options.
        - list [ref=e365]:
          - listitem [ref=e366]:
            - link "Midland ER310 user guide" [ref=e367] [cursor=pointer]:
              - /url: https://support.midlandusa.com/hc/en-us/articles/33020284947351-Midland-ER310-Emergency-Crank-Weather-Alert-Radio-Full-User-Guide
            - text: · manufacturer
          - listitem [ref=e368]:
            - link "Midland ER310 charging and alert FAQ" [ref=e369] [cursor=pointer]:
              - /url: https://support.midlandusa.com/hc/en-us/articles/29999147473431-ER310-FAQs
            - text: · manufacturer
          - listitem [ref=e370]:
            - 'link "Environment and Climate Change Canada: Weatheradio service notice" [ref=e371] [cursor=pointer]':
              - /url: https://www.canada.ca/en/environment-climate-change/services/weatheradio.html
            - text: · official safety
          - listitem [ref=e372]:
            - link "Health Canada recalls and safety alerts open dataset" [ref=e373] [cursor=pointer]:
              - /url: https://open.canada.ca/data/en/dataset/d38de914-c94c-429b-8ab1-8776c31643e3
            - text: · official recall
          - listitem [ref=e374]:
            - 'link "Midland BATT26L replacement battery: second-generation ER310 compatibility" [ref=e375] [cursor=pointer]':
              - /url: https://midlandusa.com/products/batt26l-e-ready-rechargeable-battery
            - text: · manufacturer
          - listitem [ref=e376]:
            - link "Midland ER310 manufacturer product page" [ref=e377] [cursor=pointer]:
              - /url: https://midlandusa.com/products/er310-portable-emergency-crank-weather-radio
            - text: · manufacturer
          - listitem [ref=e378]:
            - link "Amazon.ca ER310 listing — ER310-MFN and red/black fields reported by the owner" [ref=e379] [cursor=pointer]:
              - /url: https://www.amazon.ca/dp/B015QIC1PW
            - text: · retailer
        - paragraph [ref=e380]: A source-check date records the research visit. It does not guarantee the current seller, inventory, recall status or certification of a delivered unit.
        - paragraph [ref=e381]:
          - link "Back to buying options" [ref=e382] [cursor=pointer]:
            - /url: "#buy"
  - contentinfo [ref=e383]:
    - generic [ref=e384]:
      - generic [ref=e385]:
        - paragraph [ref=e386]: ApocalypseGearLab
        - paragraph [ref=e387]: Independent preparedness research. Product recommendations are published only after editorial research.
        - paragraph [ref=e388]: As an Amazon Associate I earn from qualifying purchases.
      - navigation "Footer" [ref=e389]:
        - list [ref=e390]:
          - listitem [ref=e391]:
            - link "Blackout" [ref=e392] [cursor=pointer]:
              - /url: /blackout/
          - listitem [ref=e393]:
            - link "Fallout" [ref=e394] [cursor=pointer]:
              - /url: /fallout/
          - listitem [ref=e395]:
            - link "Outbreak" [ref=e396] [cursor=pointer]:
              - /url: /outbreak/
          - listitem [ref=e397]:
            - link "Whiteout" [ref=e398] [cursor=pointer]:
              - /url: /whiteout/
          - listitem [ref=e399]:
            - link "Gear catalogue" [ref=e400] [cursor=pointer]:
              - /url: /gear/
          - listitem [ref=e401]:
            - link "How we research" [ref=e402] [cursor=pointer]:
              - /url: /how-we-research/
          - listitem [ref=e403]:
            - link "Affiliate disclosure" [ref=e404] [cursor=pointer]:
              - /url: /affiliate-disclosure/
          - listitem [ref=e405]:
            - link "Privacy policy" [ref=e406] [cursor=pointer]:
              - /url: /privacy/
    - paragraph [ref=e408]: © 2026 ApocalypseGearLab
    - group [ref=e410]:
      - generic "Analytics preferences" [ref=e411] [cursor=pointer]
      - paragraph [ref=e412]: Optional Google Analytics helps us understand page visits and equipment-link clicks. It may use cookies and send device and usage information to Google. It stays off unless you allow it. Your choice does not affect navigation or Amazon.ca links.
      - status [ref=e413]: Optional analytics is off until you allow it.
      - paragraph [ref=e414]:
        - link "Read the privacy policy" [ref=e415] [cursor=pointer]:
          - /url: /privacy/
        - text: . You can change your choice here at any time.
      - paragraph [ref=e416]: Without JavaScript, optional analytics stays off.
```

# Test source

```ts
  1  | import {test,expect} from './fixtures';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | const key='agl-analytics-consent';
  4  | const rows=(page:any)=>page.evaluate(()=>((window as any).dataLayer??[]).map((r:any)=>Array.from(r)));
  5  | const grant=async(page:any)=>{await page.locator('[data-analytics-consent]').evaluate((e:HTMLDetailsElement)=>e.open=true);await page.locator('[data-analytics-choice="granted"]').click();};
  6  | const deny=async(page:any)=>{await page.locator('[data-analytics-consent]').evaluate((e:HTMLDetailsElement)=>e.open=true);await page.locator('[data-analytics-choice="denied"]').click();};
  7  | 
  8  | test('default and rejection send no Google requests; native affiliate navigation works independently',async({page,context})=>{
  9  |  const google:string[]=[];page.on('request',r=>{if(/google|doubleclick/.test(new URL(r.url()).hostname))google.push(r.url());});
  10 |  await context.route('https://www.amazon.ca/**',r=>r.fulfill({body:'Isolated retailer'}));
  11 |  await page.goto('/gear/midland-er310/?private=query#private');
  12 |  await expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();
  13 |  await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  14 |  expect(google).toEqual([]);expect(await rows(page)).toEqual([]);
  15 |  const link=page.locator('[data-product-purchase] a[data-affiliate-click]');
  16 |  for(const rejected of [false,true]){
  17 |   if(rejected)await deny(page);
  18 |   const opened=context.waitForEvent('page');await link.click();const popup=await opened;
  19 |   await expect(popup).toHaveURL('https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');
  20 |   expect(await popup.evaluate(()=>window.opener===null)).toBe(true);await popup.close();
  21 |   expect(await rows(page)).toEqual([]);expect(google).toEqual([]);
  22 |  }
  23 |  expect((await context.cookies()).filter(c=>/^_ga/.test(c.name))).toEqual([]);
  24 |  await page.reload();await expect(page.locator('[data-analytics-status]')).toHaveText('Optional analytics is off.');
  25 |  await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  26 | });
  27 | 
  28 | test('explicit grant queues one config, persists across EN/FR, and withdrawal removes cookies and unloads analytics',async({page,context})=>{
  29 |  await page.goto('/?private=query#secret');await grant(page);
  30 |  await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
  31 |  await grant(page);await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
  32 |  const commands=await rows(page),configs=commands.filter((r:any)=>r[0]==='config');expect(configs).toHaveLength(1);
  33 |  expect(configs[0][1]).toBe('G-YFJJ5N9RBX');expect(configs[0][2]).toMatchObject({cookie_expires:15552000,cookie_update:false,allow_google_signals:false,allow_ad_personalization_signals:false});
  34 |  expect(configs[0][2].page_location).not.toContain('?');expect(configs[0][2].page_location).not.toContain('#');
  35 |  expect(commands.filter((r:any)=>r[0]==='consent').map((r:any)=>r[2].ad_storage)).toEqual(['denied','denied']);
  36 |  await page.goto('/fr/privacy/');await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
  37 |  await expect(page.locator('[data-analytics-status]')).toContainText('activée');
  38 |  await page.evaluate(()=>{document.cookie='_ga=synthetic;path=/';document.cookie='_ga_YFJJ5N9RBX=synthetic;path=/';});
  39 |  const navigation=page.waitForEvent('load');await deny(page);await navigation;
  40 |  await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  41 |  expect(await rows(page)).toEqual([]);expect((await context.cookies()).filter(c=>/^_ga/.test(c.name))).toEqual([]);
  42 |  await page.goto('/gear/midland-er310/');await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  43 | });
  44 | 
  45 | test('expired or malformed choices fail closed; storage failure cannot enable analytics',async({page})=>{
  46 |  await page.addInitScript(()=>{
  47 |   localStorage.setItem('agl-analytics-consent',JSON.stringify({version:1,choice:'granted',updatedAt:Date.now()-181*86400000}));
  48 |   sessionStorage.setItem('agl-analytics-consent','invalid');
  49 |  });
  50 |  await page.goto('/');await expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();
  51 |  await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  52 |  await page.evaluate(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});Object.defineProperty(window,'sessionStorage',{get(){throw new Error('blocked');}});});
  53 |  await deny(page);await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  54 |  await grant(page);await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
  55 | });
  56 | 
  57 | test('cross-tab withdrawal overrides a session grant',async({page,context})=>{
  58 |  await page.goto('/');await grant(page);const other=await context.newPage();await other.goto('/privacy/');
  59 |  await expect(other.locator('[data-analytics-loader]')).toHaveCount(1);
  60 |  await deny(page);await expect(other.locator('[data-analytics-loader]')).toHaveCount(0);
  61 |  expect(await other.evaluate(key=>JSON.parse(sessionStorage.getItem(key)!).choice,key)).toBe('denied');await other.close();
  62 | });
  63 | 
  64 | test('privacy drafts and keyboard-operable choices retain bilingual accessibility',async({page},testInfo)=>{
  65 |  for(const route of ['/privacy/','/fr/privacy/']){
  66 |   await page.goto(route);await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  67 |   await expect(page.locator('h1')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  68 |   const button=page.locator('[data-analytics-choice="denied"]');await button.focus();await page.keyboard.press('Enter');await expect(button).toHaveAttribute('aria-pressed','true');
  69 |   expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  70 |   await page.screenshot({path:testInfo.outputPath(route.startsWith('/fr/')?'privacy-fr.png':'privacy-en.png'),fullPage:true});
  71 |  }
  72 | });
  73 | 
  74 | test('JavaScript disabled leaves Google off and privacy/retailer links native',async({browser,baseURL})=>{
  75 |  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
  76 |  await page.goto(baseURL+'/gear/midland-er310/');await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
  77 |  await expect(page.locator('footer a[href="/privacy/"]')).toHaveCount(2);
> 78 |  await expect(page.locator('[data-product-purchase] a')).toHaveAttribute('href','https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');await context.close();
     |                                                          ^ Error: expect(locator).toHaveAttribute(expected) failed
  79 | });
  80 | 
```