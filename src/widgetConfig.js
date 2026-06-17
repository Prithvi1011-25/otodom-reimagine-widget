import {
  hasWidgetMedia,
  toWidgetMediaItems,
} from './widgetMedia.js';

export {
  WIDGET_DEV_API_BASE_URL,
  WIDGET_DEV_APP_URL,
  WIDGET_LOCAL_API_BASE_URL,
} from './widgetEnv.js';

export const WIDGET_SCRIPT_URL =
  'https://reimaginehome-embed-widget-app-git-dev-styldod.vercel.app/widget.js';

export const WIDGET_PUBLIC_KEY = 'public_key';

export const REIH_LOADER_ID = 'reih-host-loader';

export function clearReihLoader() {
  document.getElementById(REIH_LOADER_ID)?.remove();
}

export function resolveMediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('/') && typeof window !== 'undefined') {
    return `${window.location.origin}${url}`;
  }
  return url;
}

export function resolveListingMedia(media = []) {
  return media
    .filter((item) => item?.image_url)
    .map((item) => ({
      ...item,
      image_url: resolveMediaUrl(item.image_url),
    }));
}

/** Media payload for widget API — public listing URLs only, no extra keys. */
export async function resolveWidgetMedia(allMedia, slug, selectedMedia = allMedia) {
  return toWidgetMediaItems(allMedia, slug, selectedMedia);
}

export { hasWidgetMedia };

export function buildWidgetLanguage() {
  return [
    { code: 'en-US', name: 'English (United States)', nativeName: 'English (US)' },
    { code: 'en-GB', name: 'English (United Kingdom)', nativeName: 'English (UK)' },
    { code: 'pl-PL', name: 'Polish', nativeName: 'Polski' },
    { code: 'es-ES', name: 'Spanish', nativeName: 'Español' },
  ];
}

export function buildWidgetBranding() {
  return {
    logo: 'https://ecdn.styldod.com/assets/logo/6a2bca9bce2a355c2c13d058.svg',
    text_primary: '#071121FF',
    text_secondary: '#1B232E',
    primary_color: '#00b388',
    heading: 'Reimagine this space',
    sub_heading: 'Powered by ReimagineHome AI',
    footer_text: '',
  };
}

export function getWidgetHostCssVars() {
  const branding = buildWidgetBranding();
  return {
    '--otodom-green': branding.primary_color,
    '--reih-primary': branding.primary_color,
    '--reih-text-primary': branding.text_primary.replace(/ff$/i, ''),
    '--reih-text-secondary': branding.text_secondary,
  };
}

const widgetCallbacks = {
  onComplete: (detail) => {
    console.log('[reih] onComplete:', detail);
  },
  onError: (err) => {
    console.error('[reih] onError:', err);
  },
  onClose: () => {
    console.log('[reih] onClose: widget closed');
  },
};

export async function openReihWithMedia(widget, media) {
  clearReihLoader();
  if (media.length === 0) {
    console.warn('[reih] No images configured for this listing yet.');
    return;
  }

  await widget.open({
    media,
    mode: 'simple',
    branding: buildWidgetBranding(),
    sidebar_position: 'right',
    language: buildWidgetLanguage(),
  });
}

export function waitForReihWidget(timeoutMs = 30_000) {
  const existing = window.reihWidget;
  if (existing && typeof existing.open === 'function') {
    return Promise.resolve(existing);
  }

  return new Promise((resolve, reject) => {
    const script = document.querySelector('script[src*="widget.js"]');

    let settled = false;
    const finish = (widget) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      clearInterval(poller);
      script?.removeEventListener('load', tryResolve);
      resolve(widget);
    };

    const tryResolve = () => {
      const widget = window.reihWidget;
      if (widget && typeof widget.open === 'function') {
        finish(widget);
      }
    };

    script?.addEventListener('load', tryResolve);
    const poller = window.setInterval(tryResolve, 50);

    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      clearInterval(poller);
      script?.removeEventListener('load', tryResolve);
      reject(new Error('[reih] Widget script did not load in time'));
    }, timeoutMs);

    tryResolve();
  });
}

export async function buildScriptEmbedWidgetConfig(media, slug) {
  return {
    media: await resolveWidgetMedia(media, slug),
    mode: 'simple',
    branding: buildWidgetBranding(),
    sidebar_position: 'right',
    language: buildWidgetLanguage(),
    ...widgetCallbacks,
  };
}

export async function buildWidgetConfig(media, slug) {
  return {
    public_key: WIDGET_PUBLIC_KEY,
    ...(await buildScriptEmbedWidgetConfig(media, slug)),
  };
}

export async function buildNpmWidgetConfigureOptions(media, slug) {
  return {
    public_key: WIDGET_PUBLIC_KEY,
    media: await resolveWidgetMedia(media, slug),
    mode: 'simple',
    branding: buildWidgetBranding(),
    sidebar_position: 'right',
    language: buildWidgetLanguage(),
    ...widgetCallbacks,
  };
}
