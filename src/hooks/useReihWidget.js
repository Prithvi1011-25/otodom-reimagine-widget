import { useCallback, useEffect, useRef } from 'react';
import { reihWidget } from 'reimaginehome-widget';
import {
  WIDGET_LOCAL_API_BASE_URL,
  buildNpmWidgetConfigureOptions,
  clearReihLoader,
  openReihWithMedia,
  resolveWidgetMedia,
} from '../widgetConfig.js';
import { hasWidgetMedia } from '../widgetMedia.js';

/**
 * npm package integration — mirrors /Users/work/Downloads/React PackageIntegrationPage.
 */
export function useReihWidget(media, slug) {
  const openingRef = useRef(false);
  const mediaRef = useRef(media);
  const slugRef = useRef(slug);

  useEffect(() => {
    mediaRef.current = media;
    slugRef.current = slug;

    let cancelled = false;

    (async () => {
      const options = await buildNpmWidgetConfigureOptions(media, slug);
      if (!cancelled) {
        reihWidget.configure(options);
        console.log('[reih] widget configured (session API:', WIDGET_LOCAL_API_BASE_URL, ')');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [media, slug]);

  useEffect(() => {
    return () => {
      reihWidget.destroy();
      clearReihLoader();
    };
  }, []);

  const openWidget = useCallback(async (selectedMedia) => {
    if (openingRef.current) return;

    openingRef.current = true;
    try {
      const widgetMedia = await resolveWidgetMedia(
        mediaRef.current,
        slugRef.current,
        selectedMedia,
      );

      reihWidget.destroy();
      clearReihLoader();
      reihWidget.configure({
        ...(await buildNpmWidgetConfigureOptions(mediaRef.current, slugRef.current)),
        media: widgetMedia,
      });
      await openReihWithMedia(reihWidget, widgetMedia);
    } catch (error) {
      clearReihLoader();
      console.error('[reih] Widget open failed:', error);
    } finally {
      openingRef.current = false;
    }
  }, []);

  const openAll = useCallback(() => {
    void openWidget(mediaRef.current);
  }, [openWidget]);

  const openSingle = useCallback(
    (item) => {
      if (!item?.image_url) return;
      void openWidget([item]);
    },
    [openWidget],
  );

  const hasImages = hasWidgetMedia(media);

  return { openAll, openSingle, hasImages };
}
