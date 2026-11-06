// On hover, two slimmer layers step out from behind a card with a small gap between each,
// like bricks stacked behind it. Pick the direction that has room around the card.
// A card can match its own colour by setting --brick-near and --brick-far; otherwise they're grey.
export const BRICKS_UP = "hover:shadow-[0_-8px_0_-6px_#FFFFFF,0_-11px_0_-6px_var(--brick-near,#BDBDC5),0_-19px_0_-12px_#FFFFFF,0_-22px_0_-12px_var(--brick-far,#D4D4DA)]";
export const BRICKS_DOWN = "hover:shadow-[0_8px_0_-6px_#FFFFFF,0_11px_0_-6px_var(--brick-near,#BDBDC5),0_19px_0_-12px_#FFFFFF,0_22px_0_-12px_var(--brick-far,#D4D4DA)]";
