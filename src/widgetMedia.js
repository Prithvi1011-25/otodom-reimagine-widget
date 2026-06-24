/**
 * Widget API needs publicly reachable image_url values.
 * UI uses Vite-bundled assets; widget uses stable /listings/{slug}/NN.webp paths.
 */

import { WIDGET_FALLBACK_IMAGE_ORIGIN } from './widgetEnv.js';

const PRIVATE_HOST =
  /^(localhost|127\.0\.0\.1|0\.0\.0\.0|192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/i;

const LISTING_PROBE_PATH = '/listings/ostoja-wilanow/01.webp';

export function isPrivateOrigin(origin) {
  try {
    return PRIVATE_HOST.test(new URL(origin).hostname);
  } catch {
    return true;
  }
}

async function isOriginServingListings(origin) {
  if (!origin) return false;

  try {
    const response = await fetch(`${origin.replace(/\/$/, '')}${LISTING_PROBE_PATH}`, {
      method: 'HEAD',
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function fetchTunnelOrigin(maxAttempts = 24, intervalMs = 250) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch('/__reih_public_origin', { cache: 'no-store' });
      const data = await response.json();
      const origin = typeof data?.origin === 'string' ? data.origin.trim() : '';
      if (origin) return origin;
    } catch {
      // Tunnel may still be starting — keep polling briefly.
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, intervalMs);
    });
  }

  return '';
}

export async function getWidgetImageOrigin() {
  const fromEnv = import.meta.env.VITE_WIDGET_IMAGE_ORIGIN?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  if (typeof window === 'undefined') {
    return '';
  }

  if (!isPrivateOrigin(window.location.origin)) {
    return window.location.origin;
  }

  const tunnelOrigin = await fetchTunnelOrigin();
  const normalizedTunnel = tunnelOrigin.replace(/\/$/, '');
  if (normalizedTunnel && (await isOriginServingListings(normalizedTunnel))) {
    return normalizedTunnel;
  }

  const fallback = WIDGET_FALLBACK_IMAGE_ORIGIN.replace(/\/$/, '');
  if (await isOriginServingListings(fallback)) {
    if (normalizedTunnel) {
      console.warn(
        '[reih] Tunnel origin unavailable; using fallback image origin:',
        fallback,
      );
    } else {
      console.info('[reih] Using fallback image origin for local dev:', fallback);
    }
    return fallback;
  }

  console.warn('[reih] No public image origin available; widget media may fail.');
  return window.location.origin;
}

function padPhotoNumber(index) {
  return String(index + 1).padStart(2, '0');
}

export async function buildWidgetImageUrl(slug, photoIndex) {
  const origin = await getWidgetImageOrigin();
  const fileName = `${padPhotoNumber(photoIndex)}.webp`;
  return `${origin}/listings/${slug}/${fileName}`;
}

export async function toWidgetMediaItems(allMedia, slug, selectedMedia = allMedia) {
  const items = selectedMedia.filter((item) => item?.image_url);

  return Promise.all(
    items.map(async (item) => {
      const index = allMedia.findIndex((entry) => entry.id === item.id);
      const photoIndex = index >= 0 ? index : 0;
      const image_url = await buildWidgetImageUrl(slug, photoIndex);
      const payload = { image_url };

      if (item.label) {
        payload.label = item.label;
      }

      return payload;
    }),
  );
}

export function hasWidgetMedia(media) {
  return Array.isArray(media) && media.some((item) => item?.image_url);
}
