export interface AvatarOption {
  key: string;
  label: string;
  src: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { key: "warren", label: "Warren", src: "/images/agents/warren_buffett.png" },
  { key: "charlie", label: "Charlie", src: "/images/agents/charlie_munger.png" },
  { key: "cathie", label: "Cathie", src: "/images/agents/cathie_wood.png" },
  { key: "stan", label: "Stan", src: "/images/agents/stanley_druckenmiller.png" },
  { key: "ben", label: "Ben", src: "/images/agents/ben_graham.png" },
  { key: "sophie", label: "Sophie", src: "/images/agents/SOPHIE.png" },
];

export const DEFAULT_AVATAR_URL = AVATAR_OPTIONS[0].src;
