"use client";
import { IoWifiOutline } from "react-icons/io5";
import { SiDeezer, SiHbomax } from "react-icons/si";
import { featuredAdditionalTiers, featuredBenefits, featuredServiceImages, type FeaturedPlan } from "./content";
type PlanPlatform = { name: string; tone: string };
export function PlatformLogo({ platform }: { platform: PlanPlatform }) {
  if(platform.tone === "netbox") {
    return (
      <>
        <img src="/netbox-app-icon.png" alt="" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if(platform.tone === "deezer") {
    return (
      <>
        <SiDeezer aria-hidden="true" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if(platform.tone === "hbo") {
    return (
      <>
        <SiHbomax aria-hidden="true" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if(platform.tone === "ubook") {
    return (
      <>
        <img src="/featured-plans/ubook-go.jpg" alt="" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if(platform.tone === "prime") {
    return (
      <span className="platform-wordmark prime-wordmark">
        <b>prime</b>
        <small>video</small>
        <svg viewBox="0 0 36 8" aria-hidden="true">
          <path d="M2 1.5c8 5.5 20 6 30 .7" />
          <path d="m28 1 4 1-2 3" />
        </svg>
        <span className="sr-only">{platform.name}</span>
      </span>
    );
  }
  return (
    <span className="platform-wordmark disney-wordmark">
      <b>Disney</b>
      <small>+</small>
      <span className="sr-only">{platform.name}</span>
    </span>
  );
}
function FeaturedServiceIcon({ name }: { name: string }) {
  if(name === "Aplicativo Netbox") {
    return <img src="/netbox-app-icon.png" alt="" />;
  }
  if(name === "Roteador WiFi") {
    return <img src={featuredServiceImages["Roteador Wi-Fi"]} alt="" />;
  }
  if(name === "Deezer Premium") {
    return <img src={featuredServiceImages.Deezer} alt="" />;
  }
  if(featuredServiceImages[name]) {
    return <img src={featuredServiceImages[name]} alt="" />;
  }
  if(name === "App Netbox") {
    return <img src="/netbox-app-icon.png" alt="" />;
  }
  if(name === "Deezer") {
    return <PlatformLogo platform={{ name, tone: "Deezer" }} />;
  }
  return null;
}
/** Renders a featured plan, its benefits and the contact/select actions. */
export function PlanCard({
  plan,
  position,
  onSelect,
  onContact,
}: {
  plan: FeaturedPlan;
  position: "previous" | "active" | "next";
  onSelect: () => void;
  onContact: (name: string) => void;
}) {
  return (
    <article
      className={`nb-featured-card nb-featured-card-${position} nb-featured-card-${plan.tone}`}
    >
      <div className="nb-featured-card-content">
        <h3>
          {plan.tone !== "additional" && (
            <span aria-hidden="true" className="nb-featured-wifi">
              <IoWifiOutline />
            </span>
          )}
          {plan.name === "PRO"
            ? "PLANO PRO"
            : plan.name === "ADICIONAIS"
              ? "ADICIONAIS"
              : plan.name}
        </h3>

        {plan.tone === "additional" ? (
          <div className="nb-featured-services nb-featured-addons">
            <strong>Adicione ao seu plano um aplicativo</strong>
            <div
              className="nb-featured-addon-table"
              role="table"
              aria-label="Aplicativos disponíveis por categoria"
            >
              {featuredAdditionalTiers.map((tier) => (
                <div
                  className={
                    "nb-featured-addon-row nb-featured-addon-row-" +
                    tier.name.toLowerCase()
                  }
                  key={tier.name}
                  role="row"
                >
                  <strong
                    className="nb-featured-addon-tier-name"
                    role="rowheader"
                  >
                    {tier.name}
                  </strong>
                  <div className="nb-featured-addon-tier-content" role="cell">
                    {tier.name === "ADVANCED" ? (
                      <div className="nb-featured-addon-advanced">
                        <div className="nb-featured-addon-advanced-logos">
                          <img
                            src="/featured-plans/sky-amazon-prime.png"
                            alt="SKY+ e Amazon Prime"
                          />
                        </div>
                        <strong>{tier.caption}</strong>
                      </div>
                    ) : (
                      <div
                        className={
                          "nb-featured-addon-logos nb-featured-addon-logos-" +
                          tier.services.length
                        }
                      >
                        {tier.services.map((service) => (
                          <div
                            className="nb-featured-addon-service"
                            key={service}
                          >
                            <span className="nb-featured-addon-logo-frame">
                              <img
                                className="nb-featured-addon-logo"
                                src={featuredServiceImages[service]}
                                alt=""
                              />
                            </span>
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : plan.tone === "family" ? (
          <>
            <ul className="nb-featured-benefits">
              {plan.benefits?.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <div className="nb-featured-family-panel nb-featured-family-layout">
              <div className="nb-featured-family-apps">
                {plan.services.map((service) => (
                  <div className="nb-featured-service" key={service}>
                    <span className="nb-featured-service-icon">
                      <FeaturedServiceIcon name={service} />
                    </span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
              <div className="nb-featured-family-router">
                <img src={featuredServiceImages["Roteador Wi-Fi"]} alt="" />
                <strong>01 Roteador</strong>
              </div>
            </div>
          </>
        ) : plan.tone === "top-family" ? (
          <>
            <ul className="nb-featured-benefits">
              {plan.benefits?.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <div className="nb-featured-family-panel nb-featured-top-family-layout">
              <div className="nb-featured-top-family-defaults">
                <strong>Nesse plano você tem os aplicativos padrões</strong>
                <div className="nb-featured-top-family-apps">
                  {plan.services.map((service) => (
                    <div className="nb-featured-service" key={service}>
                      <span className="nb-featured-service-icon">
                        <FeaturedServiceIcon name={service} />
                      </span>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="nb-featured-family-options">
                <div className="nb-featured-family-options-box">
                  <strong>Você pode optar entre Disney Plus ou HBO Max</strong>
                  <div className="nb-featured-family-options-row">
                    <div className="nb-featured-family-option">
                      <span className="nb-featured-family-option-logo">
                        <img
                          src={featuredServiceImages["Disney Plus"]}
                          alt=""
                        />
                      </span>
                      <span>Disney Plus</span>
                    </div>
                    <div className="nb-featured-family-option">
                      <span className="nb-featured-family-option-logo">
                        <img src={featuredServiceImages["HBO Max"]} alt="" />
                      </span>
                      <span>HBO Max</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <ul className="nb-featured-benefits">
              {featuredBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            {plan.tone === "intermediate" ? (
              <div className="nb-featured-intermediate-panel">
                <div className="nb-featured-intermediate-services">
                  <strong>Serviços inclusos</strong>
                  <div className="nb-featured-services-grid">
                    {plan.services.map((service) => (
                      <div className="nb-featured-service" key={service}>
                        <span className="nb-featured-service-icon">
                          <FeaturedServiceIcon name={service} />
                        </span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="nb-featured-intermediate-router">
                  <strong>01 Roteador</strong>
                  <FeaturedServiceIcon name="Roteador Wi-Fi" />
                </div>
              </div>
            ) : (
              <div className="nb-featured-pro-panel">
                <div className="nb-featured-pro-services">
                  <strong>Serviços inclusos</strong>
                  <div className="nb-featured-services-grid">
                    {plan.services.map((service) => (
                      <div className="nb-featured-service" key={service}>
                        <span className="nb-featured-service-icon">
                          <FeaturedServiceIcon name={service} />
                        </span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="nb-featured-pro-options">
                  <strong>Nesse plano você pode optar entre</strong>
                  <div className="nb-featured-services-grid">
                    {(["Deezer", "Prime Video"] as const).map((service) => (
                      <div className="nb-featured-service" key={service}>
                        <span className="nb-featured-service-icon">
                          <FeaturedServiceIcon name={service} />
                        </span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <button
          type="button"
          className="nb-featured-cta"
          tabIndex={position === "active" ? 0 : -1}
          onClick={() => onContact(plan.name)}
        >
          <span>Conhecer esse plano</span>
          <span
            className="icon-[logos--whatsapp-icon] nb-featured-whatsapp"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          className="nb-featured-text-link"
          tabIndex={position === "active" ? 0 : -1}
          onClick={() => onContact(plan.name)}
        >
          conheça o plano →
        </button>
      </div>
      {position !== "active" && (
        <button
          type="button"
          className="nb-featured-select-card"
          onClick={onSelect}
          aria-label={`Ver plano ${plan.name}`}
        />
      )}
    </article>
  );
}
