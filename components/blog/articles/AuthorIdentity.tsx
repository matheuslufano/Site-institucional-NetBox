"use client";
import Image from "next/image";
import { useState } from "react";
import { safeAuthorPhoto } from "@/lib/blog/richDocument";
import styles from "./ArticleView.module.css";

/** Team identity uses the supplied brand; individual authors keep their profile photo. */
export default function AuthorIdentity({
  name,
  photo,
}: {
  name: string;
  photo?: string;
}) {
  const [failed, setFailed] = useState("");
  const isTeam = /^equipe\s+(?:editorial\s+)?netbox$/i.test(name.trim());
  const source = isTeam
    ? "/blog/equipe-netbox-square.png"
    : safeAuthorPhoto(photo);
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase("pt-BR");
  return (
    <div className={styles.byline}>
      <span
        className={`${styles.avatar}${isTeam ? ` ${styles.teamAvatar}` : ""}`}
      >
        {source && source !== failed ? (
          <Image
            src={source}
            alt={isTeam ? "Logo da Equipe Netbox" : `Foto de ${name}`}
            width={40}
            height={40}
            unoptimized
            onError={() => setFailed(source)}
          />
        ) : (
          <span aria-hidden="true">{initials || "N"}</span>
        )}
      </span>
      <span>
        <small>Escrito por</small>
        <strong>{name}</strong>
      </span>
    </div>
  );
}
