"use client";
import { IoCheckmark, IoWifiOutline } from "react-icons/io5";
import { SiDeezer, SiHbomax } from "react-icons/si";
import {
  featuredAdditionalTiers,
  featuredBenefits,
  featuredServiceImages,
  type FeaturedPlan,
} from "./content";
type PlanPlatform = { name: string; tone: string };
export function PlatformLogo({ platform }: { platform: PlanPlatform }) {
  if (platform.tone === "netbox") {
    return (
      <>
        <img src="/netbox-app-icon.png" alt="" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if (platform.tone === "deezer") {
    return (
      <>
        <SiDeezer aria-hidden="true" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if (platform.tone === "hbo") {
    return (
      <>
        <SiHbomax aria-hidden="true" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if (platform.tone === "ubook") {
    return (
      <>
        <img src="/featured-plans/ubook-go.jpg" alt="" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if (platform.tone === "prime") {
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
function FeaturedServiceIcon({ name, id }: { name: string; id?: string }) {
  if (name === "Aplicativo Netbox") {
    return <img id={id} src="/netbox-app-icon.png" alt="" />;
  }
  if (name === "Roteador WiFi") {
    return <img id={id} src={featuredServiceImages["Roteador Wi-Fi"]} alt="" />;
  }
  if (name === "Deezer Premium") {
    return <img id={id} src={featuredServiceImages.Deezer} alt="" />;
  }
  if (featuredServiceImages[name]) {
    return <img id={id} src={featuredServiceImages[name]} alt="" />;
  }
  if (name === "App Netbox") {
    return <img id={id} src="/netbox-app-icon.png" alt="" />;
  }
  if (name === "Deezer") {
    return <PlatformLogo platform={{ name, tone: "Deezer" }} />;
  }
  return null;
}

/** Produz fragmentos estaveis para os IDs dos servicos exibidos no cartao. */
function toFeaturedPlanIdFragment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
  const planId =
    plan.tone === "pro"
      ? "featured-plan-pro"
      : plan.tone === "intermediate"
        ? "featured-plan-intermediate"
        : plan.tone === "family"
          ? "featured-plan-family"
          : plan.tone === "top-family"
            ? "featured-plan-top-family"
            : undefined;
  const getPlanElementId = (element: string) =>
    planId ? `${planId}-${element}` : undefined;

  return (
    <article
      id={planId ? `${planId}-card` : undefined}
      className={`nb-featured-card nb-featured-card-${position} nb-featured-card-${plan.tone}`}
      data-component="featured-plan-card"
    >
      <div
        id={getPlanElementId("content")}
        className="nb-featured-card-content"
      >
        <h3 id={getPlanElementId("title")}>
          {plan.tone !== "additional" && plan.tone !== "family" && (
            <span
              id={getPlanElementId("wifi-icon")}
              aria-hidden="true"
              className="nb-featured-wifi"
            >
              <IoWifiOutline id={getPlanElementId("wifi-icon-svg")} />
            </span>
          )}
          {plan.name === "PRO"
            ? "PLANO PRO"
            : plan.name === "APLICATIVOS"
              ? "APLICATIVOS"
              : plan.name}
        </h3>

        {plan.tone === "additional" ? (
          <div className="nb-featured-services nb-featured-addons">
            <strong>Esses aplicativos podem estar no seu plano</strong>
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
                      <div className="nb-featured-addon-advanced" data-featured-brand="sky-prime">
                        <div className="nb-featured-addon-advanced-logos">
                          <img
                            src="/featured-plans/sky-amazon-prime.png"
                            alt=""
                          />
                        </div>
                        <strong className="nb-featured-addon-advanced-title">{tier.caption}</strong>
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
                            data-featured-brand={toFeaturedPlanIdFragment(service)}
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
          <div className="nb-featured-family-content">
            <ul className="nb-featured-benefits nb-featured-family-benefits">
              {plan.benefits
                ?.slice()
                .reverse()
                .map((benefit, index) => (
                  <li key={benefit}>
                    <IoCheckmark aria-hidden="true" />
                    <span>
                      {benefit === "Desconto na pontualidade"
                        ? "Desconto no pagamento com pontualidade"
                        : benefit}
                    </span>
                  </li>
                ))}
            </ul>
            <section className="nb-featured-family-section">
              <h4>{"Servi\u00e7os inclusos"}</h4>
              <div className="nb-featured-family-panel nb-featured-family-layout">
                {plan.services.map((service) => (
                  <div
                    className="nb-featured-service nb-featured-family-service"
                    data-featured-brand={toFeaturedPlanIdFragment(service)}
                    key={service}
                  >
                    <span className="nb-featured-service-icon">
                      <FeaturedServiceIcon name={service} />
                    </span>
                    <span>
                      {service === "Aplicativo Netbox"
                        ? "App NetBox"
                        : service === "SKY +"
                          ? "SKY+ LIGHT"
                          : service === "Deezer Premium"
                            ? "DEEZER"
                            : service === "Amazon Prime"
                              ? "PRIME VÍDEO"
                              : service}
                    </span>
                  </div>
                ))}
                <div className="nb-featured-family-router" data-featured-brand="roteador-wi-fi">
                  <span className="nb-featured-family-router-icon">
                    <img src={featuredServiceImages["Roteador Wi-Fi"]} alt="" />
                  </span>
                  <span>1 ROTEADOR</span>
                </div>
              </div>
            </section>
          </div>
        ) : plan.tone === "top-family" ? (
          <>
            <ul className="nb-featured-benefits nb-featured-top-family-benefits">
              {plan.benefits
                ?.slice()
                .reverse()
                .map((benefit) => (
                  <li key={benefit}>
                    <IoCheckmark aria-hidden="true" />
                    <span>
                      {benefit === "Roteador em comodato"
                        ? "Roteadores em comodato"
                        : benefit}
                    </span>
                  </li>
                ))}
            </ul>
            <div className="nb-featured-family-panel nb-featured-top-family-layout">
              <div className="nb-featured-top-family-defaults">
                <strong>{"Servi\u00e7os inclusos"}</strong>
                <div className="nb-featured-top-family-apps">
                  {plan.services.map((service) => (
                    <div className="nb-featured-service" key={service} data-featured-brand={toFeaturedPlanIdFragment(service)}>
                      <span className="nb-featured-service-icon">
                        <FeaturedServiceIcon name={service} />
                      </span>
                      <span>
                        {service === "Aplicativo Netbox"
                          ? "App NetBox"
                          : service}
                      </span>
                    </div>
                  ))}
                  <div className="nb-featured-service nb-featured-top-family-router" data-featured-brand="roteador-wi-fi">
                    <span className="nb-featured-service-icon">
                      <img
                        src={featuredServiceImages["Roteador Wi-Fi"]}
                        alt=""
                      />
                    </span>
                    <span>1 ROTEADOR</span>
                  </div>
                </div>
              </div>
              <div className="nb-featured-family-options">
                <div className="nb-featured-family-options-box">
                  <strong>{"Nesse plano voc\u00ea pode optar entre"}</strong>
                  <div className="nb-featured-family-options-row">
                    <div className="nb-featured-family-option" data-featured-brand="hbo-max">
                      <span className="nb-featured-family-option-logo">
                        <img src={featuredServiceImages["HBO Max"]} alt="" />
                      </span>
                      <span>HBO MAX</span>
                    </div>
                    <div className="nb-featured-family-option" data-featured-brand="disney">
                      <span className="nb-featured-family-option-logo">
                        <img src={featuredServiceImages["Disney +"]} alt="" />
                      </span>
                      <span>DISNEY+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : plan.tone === "intermediate" ? (
          <div className="nb-featured-pro-layout">
            <ul className="nb-featured-benefits nb-featured-pro-benefits">
              {featuredBenefits.map((benefit, index) => (
                <li id={getPlanElementId(`benefit-${index + 1}`)} key={benefit}>
                  <IoCheckmark aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <section className="nb-featured-pro-included">
              <h4>SERVIÇOS INCLUSOS</h4>
              <div className="nb-featured-pro-included-apps nb-featured-intermediate-apps">
                {plan.services.map((service) => (
                  <div
                    className={`nb-featured-pro-app${service === "App Netbox" ? " nb-featured-intermediate-app-netbox" : ""}`}
                    data-featured-brand={toFeaturedPlanIdFragment(service)}
                    key={service}
                  >
                    <span className="nb-featured-pro-app-icon">
                      <FeaturedServiceIcon name={service} />
                    </span>
                    <span>{service}</span>
                  </div>
                ))}
                <div className="nb-featured-pro-app" data-featured-brand="roteador-wi-fi">
                  <span className="nb-featured-pro-app-icon nb-featured-intermediate-router-icon">
                    <FeaturedServiceIcon name="Roteador WiFi" />
                  </span>
                  <span>01 Roteador</span>
                </div>
              </div>
            </section>
          </div>
        ) : plan.tone === "pro" ? (
          <div
            id={getPlanElementId("layout")}
            className="nb-featured-pro-layout"
          >
            <ul
              id={getPlanElementId("benefits")}
              className="nb-featured-benefits nb-featured-pro-benefits"
            >
              {featuredBenefits.map((benefit, index) => (
                <li id={getPlanElementId(`benefit-${index + 1}`)} key={benefit}>
                  <IoCheckmark
                    id={getPlanElementId(`benefit-check-${index + 1}`)}
                    aria-hidden="true"
                  />
                  <span id={getPlanElementId(`benefit-text-${index + 1}`)}>
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            <section
              id={getPlanElementId("included")}
              className="nb-featured-pro-included"
              aria-labelledby={getPlanElementId("included-title")}
            >
              <h4 id={getPlanElementId("included-title")}>Serviços inclusos</h4>
              <div
                id={getPlanElementId("included-apps")}
                className="nb-featured-pro-included-apps"
              >
                {plan.services.map((service) => (
                  <div
                    id={getPlanElementId(
                      `included-app-${toFeaturedPlanIdFragment(service)}`,
                    )}
                    className="nb-featured-pro-app"
                    data-featured-brand={toFeaturedPlanIdFragment(service)}
                    key={service}
                  >
                    <span
                      id={getPlanElementId(
                        `included-app-${toFeaturedPlanIdFragment(service)}-logo`,
                      )}
                      className="nb-featured-pro-app-icon"
                    >
                      <FeaturedServiceIcon
                        name={service}
                        id={getPlanElementId(
                          `included-app-${toFeaturedPlanIdFragment(service)}-image`,
                        )}
                      />
                    </span>
                    <span
                      id={getPlanElementId(
                        `included-app-${toFeaturedPlanIdFragment(service)}-label`,
                      )}
                    >
                      {service === "SKY +"
                        ? "SKY+ LIGHT"
                        : service === "App Netbox"
                          ? "App NetBox"
                          : service}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section
              id={getPlanElementId("choice")}
              className="nb-featured-pro-choice"
              aria-labelledby={getPlanElementId("choice-title")}
            >
              <h4 id={getPlanElementId("choice-title")}>
                Nesse plano você pode optar entre
              </h4>
              <div
                id={getPlanElementId("choice-apps")}
                className="nb-featured-pro-choice-apps"
              >
                {(["Deezer", "Prime Video"] as const).map((service) => (
                  <div
                    id={getPlanElementId(
                      `choice-app-${toFeaturedPlanIdFragment(service)}`,
                    )}
                    className="nb-featured-pro-app nb-featured-pro-app-choice"
                    data-featured-brand={toFeaturedPlanIdFragment(service)}
                    key={service}
                  >
                    <span
                      id={getPlanElementId(
                        `choice-app-${toFeaturedPlanIdFragment(service)}-logo`,
                      )}
                      className="nb-featured-pro-app-icon"
                    >
                      <FeaturedServiceIcon
                        name={service}
                        id={getPlanElementId(
                          `choice-app-${toFeaturedPlanIdFragment(service)}-image`,
                        )}
                      />
                    </span>
                    <span
                      id={getPlanElementId(
                        `choice-app-${toFeaturedPlanIdFragment(service)}-label`,
                      )}
                    >
                      {service === "Prime Video" ? "PRIME VÍDEO" : "DEEZER"}
                    </span>
                  </div>
                ))}
                <span
                  id={getPlanElementId("choice-divider")}
                  className="nb-featured-pro-choice-divider"
                  aria-hidden="true"
                >
                  ou
                </span>
              </div>
            </section>
          </div>
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
                      <div className="nb-featured-service" key={service} data-featured-brand={toFeaturedPlanIdFragment(service)}>
                        <span className="nb-featured-service-icon">
                          <FeaturedServiceIcon name={service} />
                        </span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="nb-featured-intermediate-router" data-featured-brand="roteador-wi-fi">
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
                      <div className="nb-featured-service" key={service} data-featured-brand={toFeaturedPlanIdFragment(service)}>
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
                      <div className="nb-featured-service" key={service} data-featured-brand={toFeaturedPlanIdFragment(service)}>
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
          id={getPlanElementId("contact-button")}
          className={`nb-featured-cta${plan.tone === "pro" || plan.tone === "intermediate" ? " nb-featured-pro-cta" : ""}`}
          tabIndex={position === "active" ? 0 : -1}
          onClick={() => onContact(plan.name)}
        >
          <span id={getPlanElementId("contact-label")}>
            Conhecer esse plano
          </span>
          <span
            id={getPlanElementId("whatsapp-icon")}
            className="icon-[logos--whatsapp-icon] nb-featured-whatsapp"
            aria-hidden="true"
          />
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
