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
  - link "Skip to content" [ref=e2]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "ApocalypseGearLab home" [ref=e6]:
          - /url: /
          - generic [ref=e8]: ApocalypseGearLab
        - group [ref=e9]:
          - generic "Choose language" [ref=e10] [cursor=pointer]:
            - generic [aria-hidden] [ref=e11]: ◎
            - generic [ref=e12]: English
            - generic [aria-hidden] [ref=e13]: ⌄
      - navigation "Primary" [ref=e14]:
        - list [ref=e15]:
          - listitem [ref=e16]:
            - link "Home" [ref=e17]:
              - /url: /
          - listitem [ref=e18]:
            - link "All gear" [ref=e19]:
              - /url: /gear/
          - listitem [ref=e20]:
            - link "Blackout" [ref=e21]:
              - /url: /blackout/
          - listitem [ref=e22]:
            - link "Fallout" [ref=e23]:
              - /url: /fallout/
          - listitem [ref=e24]:
            - link "Outbreak" [ref=e25]:
              - /url: /outbreak/
          - listitem [ref=e26]:
            - link "Whiteout" [ref=e27]:
              - /url: /whiteout/
          - listitem [ref=e28]:
            - link "Guides" [ref=e29]:
              - /url: /how-we-research/
        - generic [ref=e31]:
          - generic [ref=e32]:
            - link "Blackout" [ref=e34]:
              - /url: /blackout/
              - text: 01Blackout
            - generic [ref=e35]:
              - paragraph [ref=e36]: Stay powered. Stay connected.
              - list [ref=e37]:
                - listitem [ref=e38]:
                  - link "Emergency power stations 5 profiles" [ref=e39]:
                    - /url: /gear/#category-power-stations
                    - generic [ref=e40]: Emergency power stations
                    - generic "5 profiles" [ref=e41]: "05"
                - listitem [ref=e42]:
                  - link "Solar generators and panels 1 profiles" [ref=e43]:
                    - /url: /gear/#category-solar
                    - generic [ref=e44]: Solar generators and panels
                    - generic "1 profiles" [ref=e45]: "01"
                - listitem [ref=e46]:
                  - link "Portable battery banks 1 profiles" [ref=e47]:
                    - /url: /gear/#category-battery-banks
                    - generic [ref=e48]: Portable battery banks
                    - generic "1 profiles" [ref=e49]: "01"
                - listitem [ref=e50]:
                  - link "Emergency lighting 3 profiles" [ref=e51]:
                    - /url: /gear/#category-lighting
                    - generic [ref=e52]: Emergency lighting
                    - generic "3 profiles" [ref=e53]: "03"
                - listitem [ref=e54]:
                  - link "Weather radios 1 profiles" [ref=e55]:
                    - /url: /gear/#category-weather-radios
                    - generic [ref=e56]: Weather radios
                    - generic "1 profiles" [ref=e57]: "01"
                - listitem [ref=e58]:
                  - link "Backup communication 1 profiles" [ref=e59]:
                    - /url: /gear/#category-backup-comms
                    - generic [ref=e60]: Backup communication
                    - generic "1 profiles" [ref=e61]: "01"
                - listitem [ref=e62]:
                  - link "Home power outage preparedness 1 profiles" [ref=e63]:
                    - /url: /gear/#category-home-outage-planning
                    - generic [ref=e64]: Home power outage preparedness
                    - generic "1 profiles" [ref=e65]: "01"
                - listitem [ref=e66]:
                  - link "Portable refrigeration & freezers 2 profiles" [ref=e67]:
                    - /url: /gear/#category-portable-refrigeration
                    - generic [ref=e68]: Portable refrigeration & freezers
                    - generic "2 profiles" [ref=e69]: "02"
                - listitem [ref=e70]:
                  - link "Temperature monitoring & food preservation 1 profiles" [ref=e71]:
                    - /url: /gear/#category-temperature-monitoring
                    - generic [ref=e72]: Temperature monitoring & food preservation
                    - generic "1 profiles" [ref=e73]: "01"
                - listitem [ref=e74]:
                  - link "Rechargeable batteries & charging accessories 2 profiles" [ref=e75]:
                    - /url: /gear/#category-rechargeable-batteries
                    - generic [ref=e76]: Rechargeable batteries & charging accessories
                    - generic "2 profiles" [ref=e77]: "02"
          - generic [ref=e78]:
            - link "Fallout" [ref=e80]:
              - /url: /fallout/
              - text: 02Fallout
            - generic [ref=e81]:
              - paragraph [ref=e82]: Prepare the essentials.
              - list [ref=e83]:
                - listitem [ref=e84]:
                  - link "Water storage and purification 2 profiles" [ref=e85]:
                    - /url: /gear/#category-water
                    - generic [ref=e86]: Water storage and purification
                    - generic "2 profiles" [ref=e87]: "02"
                - listitem [ref=e88]:
                  - link "Emergency food storage 1 profiles" [ref=e89]:
                    - /url: /gear/#category-food-storage
                    - generic [ref=e90]: Emergency food storage
                    - generic "1 profiles" [ref=e91]: "01"
                - listitem [ref=e92]:
                  - link "Emergency food rations 2 profiles" [ref=e93]:
                    - /url: /gear/#category-food-rations
                    - generic [ref=e94]: Emergency food rations
                    - generic "2 profiles" [ref=e95]: "02"
                - listitem [ref=e96]:
                  - link "Radiation detection 2 profiles" [ref=e97]:
                    - /url: /gear/#category-radiation-detection
                    - generic [ref=e98]: Radiation detection
                    - generic "2 profiles" [ref=e99]: "02"
                - listitem [ref=e100]:
                  - link "Emergency repair tools 1 profiles" [ref=e101]:
                    - /url: /gear/#category-tools
                    - generic [ref=e102]: Emergency repair tools
                    - generic "1 profiles" [ref=e103]: "01"
                - listitem [ref=e104]:
                  - link "First aid supplies 1 profiles" [ref=e105]:
                    - /url: /gear/#category-first-aid
                    - generic [ref=e106]: First aid supplies
                    - generic "1 profiles" [ref=e107]: "01"
                - listitem [ref=e108]:
                  - link "Emergency shelter 1 profiles" [ref=e109]:
                    - /url: /gear/#category-shelter
                    - generic [ref=e110]: Emergency shelter
                    - generic "1 profiles" [ref=e111]: "01"
                - listitem [ref=e112]:
                  - link "Emergency hygiene & sanitation 1 profiles" [ref=e113]:
                    - /url: /gear/#category-hygiene-sanitation
                    - generic [ref=e114]: Emergency hygiene & sanitation
                    - generic "1 profiles" [ref=e115]: "01"
                - listitem [ref=e116]:
                  - link "Exploration & metal detection 1 profiles" [ref=e117]:
                    - /url: /gear/#category-metal-detection
                    - generic [ref=e118]: Exploration & metal detection
                    - generic "1 profiles" [ref=e119]: "01"
          - generic [ref=e120]:
            - link "Outbreak" [ref=e122]:
              - /url: /outbreak/
              - text: 03Outbreak
            - generic [ref=e123]:
              - paragraph [ref=e124]: Pack for the unknown.
              - list [ref=e125]:
                - listitem [ref=e126]:
                  - link "Evacuation backpacks 1 profiles" [ref=e127]:
                    - /url: /gear/#category-tactical-backpacks
                    - generic [ref=e128]: Evacuation backpacks
                    - generic "1 profiles" [ref=e129]: "01"
                - listitem [ref=e130]:
                  - link "Respiratory protection 6 profiles" [ref=e131]:
                    - /url: /gear/#category-respiratory-protection
                    - generic [ref=e132]: Respiratory protection
                    - generic "6 profiles" [ref=e133]: "06"
                - listitem [ref=e134]:
                  - link "Protective eyewear 1 profiles" [ref=e135]:
                    - /url: /gear/#category-protective-eyewear
                    - generic [ref=e136]: Protective eyewear
                    - generic "1 profiles" [ref=e137]: "01"
                - listitem [ref=e138]:
                  - link "Protective work gloves 1 profiles" [ref=e139]:
                    - /url: /gear/#category-work-gloves
                    - generic [ref=e140]: Protective work gloves
                    - generic "1 profiles" [ref=e141]: "01"
                - listitem [ref=e142]:
                  - link "Hiking footwear 1 profiles" [ref=e143]:
                    - /url: /gear/#category-hiking-footwear
                    - generic [ref=e144]: Hiking footwear
                    - generic "1 profiles" [ref=e145]: "01"
                - listitem [ref=e146]:
                  - link "Rain shells 1 profiles" [ref=e147]:
                    - /url: /gear/#category-rainwear
                    - generic [ref=e148]: Rain shells
                    - generic "1 profiles" [ref=e149]: "01"
                - listitem [ref=e150]:
                  - link "Satellite navigation and communication 1 profiles" [ref=e151]:
                    - /url: /gear/#category-satellite-navigation
                    - generic [ref=e152]: Satellite navigation and communication
                    - generic "1 profiles" [ref=e153]: "01"
                - listitem [ref=e154]:
                  - link "Outdoor & survival knives 3 profiles" [ref=e155]:
                    - /url: /gear/#category-fixed-blade-knives
                    - generic [ref=e156]: Outdoor & survival knives
                    - generic "3 profiles" [ref=e157]: "03"
                - listitem [ref=e158]:
                  - link "Optics & observation 1 profiles" [ref=e159]:
                    - /url: /gear/#category-optics-observation
                    - generic [ref=e160]: Optics & observation
                    - generic "1 profiles" [ref=e161]: "01"
          - generic [ref=e162]:
            - link "Whiteout" [ref=e164]:
              - /url: /whiteout/
              - text: 04Whiteout
            - generic [ref=e165]:
              - paragraph [ref=e166]: Insulate. Stay dry. Plan shelter.
              - list [ref=e167]:
                - listitem [ref=e168]:
                  - link "Winter sleeping pads & insulation 1 profiles" [ref=e169]:
                    - /url: /gear/#category-winter-sleep-systems
                    - generic [ref=e170]: Winter sleeping pads & insulation
                    - generic "1 profiles" [ref=e171]: "01"
                - listitem [ref=e172]:
                  - link "Winter gloves & mitts 2 profiles" [ref=e173]:
                    - /url: /gear/#category-winter-gloves-mitts
                    - generic [ref=e174]: Winter gloves & mitts
                    - generic "2 profiles" [ref=e175]: "02"
                - listitem [ref=e176]:
                  - link "Winter headwear & face layers 2 profiles" [ref=e177]:
                    - /url: /gear/#category-winter-headwear
                    - generic [ref=e178]: Winter headwear & face layers
                    - generic "2 profiles" [ref=e179]: "02"
                - listitem [ref=e180]:
                  - link "Snow goggles & lens selection 1 profiles" [ref=e181]:
                    - /url: /gear/#category-snow-goggles
                    - generic [ref=e182]: Snow goggles & lens selection
                    - generic "1 profiles" [ref=e183]: "01"
          - generic [ref=e184]:
            - generic [ref=e185]: Discover guides
            - generic [ref=e187]:
              - paragraph [ref=e188]: Build a plan before a kit.
              - list [ref=e189]:
                - listitem [ref=e190]:
                  - link "How we research" [ref=e191]:
                    - /url: /how-we-research/
                    - text: How we research
                    - generic [aria-hidden] [ref=e192]: ↗
                - listitem [ref=e193]:
                  - link "Blackout planning guide" [ref=e194]:
                    - /url: /blackout/#sector-guide
                - listitem [ref=e195]:
                  - link "Fallout planning guide" [ref=e196]:
                    - /url: /fallout/#sector-guide
                - listitem [ref=e197]:
                  - link "Outbreak planning guide" [ref=e198]:
                    - /url: /outbreak/#sector-guide
                - listitem [ref=e199]:
                  - link "Whiteout planning guide" [ref=e200]:
                    - /url: /whiteout/#sector-guide
              - paragraph [ref=e201]: Specifications. Sources. Limitations.Equipment research for informed preparation.
  - main [ref=e202]:
    - article [ref=e203]:
      - navigation "Breadcrumb" [ref=e204]:
        - list [ref=e205]:
          - listitem [ref=e206]:
            - link "Home" [ref=e207]:
              - /url: /
          - listitem [ref=e208]:
            - text: /
            - link "Blackout" [ref=e209]:
              - /url: /blackout/
          - listitem [ref=e210]: / Midland ER310 emergency radio
      - paragraph [ref=e211]:
        - strong [ref=e212]: Informational profile.
        - text: The retailer link uses the recorded ASIN. The current listing, seller and package have not been independently verified. This is not a hands-on review, certification claim or purchase recommendation.
      - paragraph [ref=e213]: Weather radios · Midland · ER310
      - heading "Midland ER310 emergency radio" [level=1] [ref=e214]
      - paragraph [ref=e215]: An AM/FM emergency radio with rechargeable, AA, hand-crank and supplementary solar power options. Canadian Weatheradio coverage is no longer available.
      - paragraph [ref=e216]:
        - generic [ref=e217]: Not physically tested by us
        - generic [ref=e218]: Sources checked 2026-10-29
      - generic [ref=e219]:
        - paragraph [ref=e220]:
          - strong [ref=e221]: Information only.
          - text: Manufacturer sources cited. Listing documented by owner.
        - paragraph [ref=e222]: Editorial verification incomplete.
        - paragraph [ref=e223]: Manufacturer specifications describe the documented model; they do not authenticate the current retailer offer or supplied unit. The listing evidence comes from the owner, not an independent inspection of the current offer.
        - paragraph [ref=e224]: Amazon.ca link available. Product-specific safety review remains incomplete; read the limitations below.
      - region [ref=e225]:
        - heading "Where to buy" [level=2] [ref=e226]
        - complementary "Affiliate disclosure" [ref=e227]:
          - paragraph [ref=e228]:
            - text: As an Amazon Associate I earn from qualifying purchases.
            - link "Full disclosure" [ref=e229]:
              - /url: /affiliate-disclosure/
            - text: .
        - paragraph [ref=e230]:
          - link "View on Amazon.ca (affiliate link, opens in a new tab)" [ref=e231] [cursor=pointer]:
            - /url: https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20
            - text: View on Amazon.ca
            - generic [ref=e232]: (affiliate link, opens in a new tab)
      - paragraph [ref=e233]:
        - text: "Plan the task:"
        - link "plan radio power alongside lighting and phone charging" [ref=e234]:
          - /url: /blackout/#planning-5
        - text: . Check specifications and compatible components in the exact model instructions. Read
        - link "how we research equipment" [ref=e235]:
          - /url: /how-we-research/
        - text: .
      - figure "Concept illustration, not a product photograph. Illustrated labels are not specifications; see the documented model details." [ref=e236]:
        - img "Concept illustration of a red Midland emergency radio in an amber inventory frame" [ref=e237]
        - generic [ref=e238]:
          - text: Concept illustration, not a product photograph.
          - generic [ref=e239]: Illustrated labels are not specifications; see the documented model details.
      - generic [ref=e240]:
        - heading "Overview" [level=2] [ref=e241]
        - paragraph [ref=e242]: Keep the ER310 on the shortlist for listening to available local AM/FM broadcasts during an outage. Weather-band hardware and a working alert service are different things. Canada has discontinued Weatheradio, so a Canadian household should build its information plan around currently available services instead of assuming this radio will receive local weather alerts.
      - generic [ref=e243]:
        - heading "Documented specifications" [level=2] [ref=e244]
        - region "Midland ER310 emergency radio specifications" [ref=e245]:
          - table [ref=e246]:
            - caption [ref=e247]: Documented specifications for Midland ER310 emergency radio
            - rowgroup [ref=e248]:
              - row [ref=e249]:
                - rowheader "Broadcast bands" [ref=e250]
                - cell [ref=e251]:
                  - text: AM, FM and seven weather channels
                  - link "Source 1" [ref=e253]:
                    - /url: "#source-midland-er310"
              - row [ref=e254]:
                - rowheader "Weather-band range" [ref=e255]
                - cell [ref=e256]:
                  - text: 162.400–162.550 MHz
                  - link "Source 1" [ref=e258]:
                    - /url: "#source-midland-er310"
              - row [ref=e259]:
                - rowheader "Charging options" [ref=e260]
                - cell [ref=e261]:
                  - text: Micro-USB input, hand crank and built-in solar panel
                  - link "Source 1" [ref=e263]:
                    - /url: "#source-midland-er310"
              - row [ref=e264]:
                - rowheader "Battery options" [ref=e265]
                - cell [ref=e266]:
                  - text: Rechargeable lithium-ion battery or six AA cells; AA cells are not recharged by the unit
                  - link "Source 1" [ref=e268]:
                    - /url: "#source-midland-er310"
              - row [ref=e269]:
                - rowheader "Solar limitation" [ref=e270]
                - cell [ref=e271]:
                  - text: Midland says solar is supplementary and will not recharge a depleted battery by itself
                  - link "Source 2" [ref=e273]:
                    - /url: "#source-midland-er310-faq"
      - generic [ref=e274]:
        - generic [ref=e275]:
          - heading "Advantages" [level=2] [ref=e276]
          - list [ref=e277]:
            - listitem [ref=e278]: AM/FM reception does not require a phone data connection.
            - listitem [ref=e279]: AA backup and USB charging offer alternatives to the internal battery.
        - generic [ref=e280]:
          - heading "Limitations" [level=2] [ref=e281]
          - list [ref=e282]:
            - listitem [ref=e283]: Canadian Weatheradio is no longer operating.
            - listitem [ref=e284]: Hand-crank and solar charging are not substitutes for routine USB recharging.
            - listitem [ref=e285]: The documented battery capacities differ and are not assigned to the supplied radio; no runtime or delivered capacity is guaranteed.
      - generic [ref=e286]:
        - heading "Potential uses and conditions" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]: Listen to available local AM/FM outage updates.
          - listitem [ref=e290]: Include radio charging and spare-cell checks in a household readiness routine.
      - region [ref=e291]:
        - heading "What the sources confirm" [level=2] [ref=e292]
        - paragraph [ref=e293]: These statements cite the linked sources. Manufacturer documentation and retailer representations are identified separately; they are not independent performance measurements.
        - list [ref=e294]:
          - listitem [ref=e295]:
            - text: ECCC states that Weatheradio and Hello Weather are no longer in service.
            - link "Source 3" [ref=e296]:
              - /url: "#source-eccc-weatheradio"
          - listitem [ref=e297]:
            - text: The ER310 has AM/FM and weather-band reception; this is not the ER310PRO.
            - link "Source 1" [ref=e298]:
              - /url: "#source-midland-er310"
          - listitem [ref=e299]:
            - text: Midland documents BATT26L as a 2600 mAh replacement for second-generation ER310. That is not evidence that the conflicting guide values describe a verified shipment change.
            - link "Source 5" [ref=e300]:
              - /url: "#source-midland-batt26l"
      - generic [ref=e301]:
        - heading "What to check before buying" [level=2] [ref=e302]
        - list [ref=e303]:
          - listitem [ref=e304]: Recheck the ER310 / ER310-MFN red-and-black selection and supplied accessories; the recorded listing identity comes from owner-reported fields, not independent seller authentication.
          - listitem [ref=e305]: Confirm the rechargeable battery revision and the backup AA requirements of the supplied radio.
          - listitem [ref=e306]: Check which local AM/FM stations provide useful outage information; do not rely on Canadian Weatheradio alerts.
          - listitem [ref=e307]: Treat solar charging as supplementary rather than a guaranteed recharge plan.
      - generic [ref=e308]:
        - heading "Safety and compatibility notes" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]: Do not promise Canadian weather-alert coverage. Reception of any available US NOAA signal is location-dependent and has not been tested.
          - listitem [ref=e312]: Manufacturer materials conflict on capacity, including within the current guide. BATT26L is documented for second-generation ER310, but this does not establish a 2600/3500 revision history or the battery shipped under this ASIN. Use only the specified Midland pack.
      - region [ref=e313]:
        - heading "Related equipment profiles" [level=2] [ref=e314]
        - paragraph [ref=e315]: These reference profiles describe documented features and unresolved limitations. They are not purchase recommendations.
        - generic [ref=e316]:
          - article [ref=e317]:
            - figure "Concept illustration, not a product photograph." [ref=e318]:
              - img "Concept illustration of a camouflage Fenix camping lantern in an amber inventory frame" [ref=e319]
            - paragraph [ref=e321]: Blackout · Emergency lighting
            - paragraph [ref=e322]: Fenix · CL26R PRO
            - heading [level=3] [ref=e323]:
              - link "Fenix CL26R Pro rechargeable lantern" [ref=e324]:
                - /url: /gear/fenix-cl26r-pro/
            - paragraph [ref=e325]: A rechargeable lantern with area, downward and red lighting modes for shared rooms, work surfaces and a portable blackout lighting kit.
            - paragraph [ref=e326]:
              - strong [ref=e327]: "Consider:"
              - text: Output can step down as the lantern gets hot.
            - link "Product details for Fenix CL26R Pro rechargeable lantern" [ref=e328]:
              - /url: /gear/fenix-cl26r-pro/
              - text: Product details
              - generic [ref=e329]: for Fenix CL26R Pro rechargeable lantern
            - generic [ref=e330]:
              - paragraph [ref=e331]: Amazon.ca link available
              - complementary "Affiliate disclosure" [ref=e332]:
                - paragraph [ref=e333]:
                  - text: As an Amazon Associate I earn from qualifying purchases.
                  - link "Full disclosure" [ref=e334]:
                    - /url: /affiliate-disclosure/
                  - text: .
              - link "View on Amazon.ca (affiliate link, opens in a new tab)" [ref=e335] [cursor=pointer]:
                - /url: https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20
                - text: View on Amazon.ca
                - generic [ref=e336]: (affiliate link, opens in a new tab)
          - article [ref=e337]:
            - figure "Concept illustration, not a product photograph." [ref=e338]:
              - img "Concept illustration of a black INIU power bank with display and detachable cable in an amber frame" [ref=e339]
            - paragraph [ref=e341]: Blackout · Portable battery banks
            - paragraph [ref=e342]: INIU · P62-E1
            - heading [level=3] [ref=e343]:
              - link "INIU P62 20000 mAh 65 W power bank" [ref=e344]:
                - /url: /gear/iniu-p62-20000mah-65w/
            - paragraph [ref=e345]: A USB-C power bank marketed at 20000 mAh and 65 W, documented by the manufacturer as P62-E1. The exact Canadian listing configuration and safety evidence remain unverified.
            - paragraph [ref=e346]: Safety verification incomplete.
            - generic [ref=e347]:
              - paragraph [ref=e348]: Amazon link pending verification
              - paragraph [ref=e349]: Exact-model safety verification is incomplete.
              - link "Details about INIU P62 20000 mAh 65 W power bank" [ref=e350]:
                - /url: /gear/iniu-p62-20000mah-65w/
                - text: Details
                - generic [ref=e351]: about INIU P62 20000 mAh 65 W power bank
      - region [ref=e352]:
        - heading "Technical Sources & References" [level=2] [ref=e353]
        - paragraph [ref=e354]: Documentation for the specifications and limitations above. Manufacturer references and retailer identity evidence serve different purposes; these are not additional purchase options.
        - list [ref=e355]:
          - listitem [ref=e356]:
            - link "Midland ER310 user guide" [ref=e357]:
              - /url: https://support.midlandusa.com/hc/en-us/articles/33020284947351-Midland-ER310-Emergency-Crank-Weather-Alert-Radio-Full-User-Guide
            - text: · manufacturer
          - listitem [ref=e358]:
            - link "Midland ER310 charging and alert FAQ" [ref=e359]:
              - /url: https://support.midlandusa.com/hc/en-us/articles/29999147473431-ER310-FAQs
            - text: · manufacturer
          - listitem [ref=e360]:
            - 'link "Environment and Climate Change Canada: Weatheradio service notice" [ref=e361]':
              - /url: https://www.canada.ca/en/environment-climate-change/services/weatheradio.html
            - text: · official safety
          - listitem [ref=e362]:
            - link "Health Canada recalls and safety alerts open dataset" [ref=e363]:
              - /url: https://open.canada.ca/data/en/dataset/d38de914-c94c-429b-8ab1-8776c31643e3
            - text: · official recall
          - listitem [ref=e364]:
            - 'link "Midland BATT26L replacement battery: second-generation ER310 compatibility" [ref=e365]':
              - /url: https://midlandusa.com/products/batt26l-e-ready-rechargeable-battery
            - text: · manufacturer
          - listitem [ref=e366]:
            - link "Midland ER310 manufacturer product page" [ref=e367]:
              - /url: https://midlandusa.com/products/er310-portable-emergency-crank-weather-radio
            - text: · manufacturer
          - listitem [ref=e368]:
            - link "Amazon.ca ER310 listing — ER310-MFN and red/black fields reported by the owner" [ref=e369]:
              - /url: https://www.amazon.ca/dp/B015QIC1PW
            - text: · retailer
        - paragraph [ref=e370]: A source-check date records the research visit. It does not guarantee the current seller, inventory, recall status or certification of a delivered unit.
        - paragraph [ref=e371]:
          - link "Back to buying options" [ref=e372]:
            - /url: "#buy"
  - contentinfo [ref=e373]:
    - generic [ref=e374]:
      - generic [ref=e375]:
        - paragraph [ref=e376]: ApocalypseGearLab
        - paragraph [ref=e377]: Independent preparedness research. Product recommendations are published only after editorial research.
        - paragraph [ref=e378]: As an Amazon Associate I earn from qualifying purchases.
      - navigation "Footer" [ref=e379]:
        - list [ref=e380]:
          - listitem [ref=e381]:
            - link "Blackout" [ref=e382]:
              - /url: /blackout/
          - listitem [ref=e383]:
            - link "Fallout" [ref=e384]:
              - /url: /fallout/
          - listitem [ref=e385]:
            - link "Outbreak" [ref=e386]:
              - /url: /outbreak/
          - listitem [ref=e387]:
            - link "Whiteout" [ref=e388]:
              - /url: /whiteout/
          - listitem [ref=e389]:
            - link "Gear catalogue" [ref=e390]:
              - /url: /gear/
          - listitem [ref=e391]:
            - link "How we research" [ref=e392]:
              - /url: /how-we-research/
          - listitem [ref=e393]:
            - link "Affiliate disclosure" [ref=e394]:
              - /url: /affiliate-disclosure/
          - listitem [ref=e395]:
            - link "Privacy policy" [ref=e396]:
              - /url: /privacy/
    - paragraph [ref=e398]: © 2026 ApocalypseGearLab
    - group [ref=e400]:
      - generic "Analytics preferences" [ref=e401] [cursor=pointer]
      - paragraph [ref=e402]: Optional Google Analytics helps us understand page visits and equipment-link clicks. It may use cookies and send device and usage information to Google. It stays off unless you allow it. Your choice does not affect navigation or Amazon.ca links.
      - status [ref=e403]: Optional analytics is off until you allow it.
      - paragraph [ref=e404]:
        - link "Read the privacy policy" [ref=e405]:
          - /url: /privacy/
        - text: . You can change your choice here at any time.
      - paragraph [ref=e406]: Without JavaScript, optional analytics stays off.
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
> 78 |  await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAttribute('href','https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');await context.close();
     |                                                          ^ Error: expect(locator).toHaveAttribute(expected) failed
  79 | });
  80 | 
  81 | test('clearing storage in another tab also revokes an existing document grant',async({page,context})=>{
  82 |  await page.goto('/');await grant(page);const other=await context.newPage();await other.goto('/privacy/');
  83 |  await expect(other.locator('[data-analytics-loader]')).toHaveCount(1);await other.evaluate(()=>localStorage.clear());
  84 |  await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  85 |  expect(await page.evaluate(()=>sessionStorage.getItem('agl-analytics-consent'))).toBe(null);await other.close();
  86 | });
  87 | 
```