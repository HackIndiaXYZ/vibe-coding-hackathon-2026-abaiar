import {
  getServerProviders,
  getServerTTSProviders,
  getServerASRProviders,
  getServerPDFProviders,
  getServerImageProviders,
  getServerVideoProviders,
  getServerWebSearchProviders,
  getConfigWithApiMgmt,
} from '@/lib/server/provider-config';
import { apiError, apiSuccess } from '@/lib/server/api-response';
import { createLogger } from '@/lib/logger';

const log = createLogger('ServerProviders');

export async function GET() {
  try {
    const mergedConfig = await getConfigWithApiMgmt();

    const providers: Record<string, { models?: string[]; baseUrl?: string }> = {};
    for (const [id, entry] of Object.entries(mergedConfig.providers)) {
      providers[id] = {};
      if (entry.models && entry.models.length > 0) providers[id].models = entry.models;
      if (entry.baseUrl) providers[id].baseUrl = entry.baseUrl;
    }

    const tts: Record<string, { baseUrl?: string }> = {};
    for (const [id, entry] of Object.entries(mergedConfig.tts)) {
      tts[id] = {};
      if (entry.baseUrl) tts[id].baseUrl = entry.baseUrl;
    }

    const asr: Record<string, { baseUrl?: string }> = {};
    for (const [id, entry] of Object.entries(mergedConfig.asr)) {
      asr[id] = {};
      if (entry.baseUrl) asr[id].baseUrl = entry.baseUrl;
    }

    const pdf: Record<string, { baseUrl?: string }> = {};
    for (const [id, entry] of Object.entries(mergedConfig.pdf)) {
      pdf[id] = {};
      if (entry.baseUrl) pdf[id].baseUrl = entry.baseUrl;
    }

    const image: Record<string, { baseUrl?: string }> = {};
    for (const [id, entry] of Object.entries(mergedConfig.image)) {
      image[id] = {};
      if (entry.baseUrl) image[id].baseUrl = entry.baseUrl;
    }

    const video: Record<string, { baseUrl?: string }> = {};
    for (const [id, entry] of Object.entries(mergedConfig.video)) {
      video[id] = {};
      if (entry.baseUrl) video[id].baseUrl = entry.baseUrl;
    }

    const webSearch: Record<string, { baseUrl?: string }> = {};
    for (const [id, entry] of Object.entries(mergedConfig.webSearch)) {
      webSearch[id] = {};
      if (entry.baseUrl) webSearch[id].baseUrl = entry.baseUrl;
    }

    return apiSuccess({ providers, tts, asr, pdf, image, video, webSearch });
  } catch (error) {
    log.error('Error fetching server providers:', error);
    return apiError(
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
}
