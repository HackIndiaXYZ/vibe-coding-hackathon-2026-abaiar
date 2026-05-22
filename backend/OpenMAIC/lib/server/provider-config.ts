/**
 * Server-side Provider Configuration
 *
 * Configuration Sources (in order of priority):
 * 1. Unified API Management Service (primary, port 5010) - Real-time config from centralized management
 * 2. Environment variables (fallback) - For bootstrapping when API Mgmt is unavailable
 * 3. YAML file (legacy fallback) - server-providers.yml
 *
 * Keys never leave the server — only provider IDs and metadata are exposed via API.
 *
 * NOTE: API configurations should be managed through the Unified API Management interface.
 * Visit: http://localhost:3001/api-management
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { createLogger } from '@/lib/logger';

const log = createLogger('ServerProviderConfig');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ServerProviderEntry {
  apiKey: string;
  baseUrl?: string;
  models?: string[];
  proxy?: string;
}

interface ServerConfig {
  providers: Record<string, ServerProviderEntry>;
  tts: Record<string, ServerProviderEntry>;
  asr: Record<string, ServerProviderEntry>;
  pdf: Record<string, ServerProviderEntry>;
  image: Record<string, ServerProviderEntry>;
  video: Record<string, ServerProviderEntry>;
  webSearch: Record<string, ServerProviderEntry>;
}

// ---------------------------------------------------------------------------
// Unified API Management Service Configuration
// ---------------------------------------------------------------------------

const API_MGMT_BASE_URL = process.env.API_MGMT_BASE_URL || 'http://127.0.0.1:5010';
const API_MGMT_FETCH_TIMEOUT = 3000;
const API_MGMT_CACHE_TTL = 30_000;

let _apiMgmtCache: { data: Record<string, unknown> | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

async function fetchApiMgmtConfig(): Promise<Record<string, unknown> | null> {
  const now = Date.now();
  if (_apiMgmtCache.data && now - _apiMgmtCache.timestamp < API_MGMT_CACHE_TTL) {
    return _apiMgmtCache.data;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_MGMT_FETCH_TIMEOUT);
    const res = await fetch(`${API_MGMT_BASE_URL}/api/config`, {
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      log.warn(`[ServerProviderConfig] API Mgmt service returned ${res.status}`);
      return _apiMgmtCache.data;
    }

    const data = await res.json();
    _apiMgmtCache = { data, timestamp: now };
    return data;
  } catch (e) {
    log.warn('[ServerProviderConfig] Failed to fetch from API Mgmt service, falling back to local config');
    return _apiMgmtCache.data;
  }
}

function mergeApiMgmtConfig(base: ServerConfig, apiMgmt: Record<string, unknown>): ServerConfig {
  const categoryMap: Record<string, keyof ServerConfig> = {
    llm: 'providers',
    tts: 'tts',
    asr: 'asr',
    pdf: 'pdf',
    image: 'image',
    video: 'video',
    webSearch: 'webSearch',
  };

  for (const [apiCategory, configKey] of Object.entries(categoryMap)) {
    const apiProviders = apiMgmt[apiCategory];
    if (!apiProviders || typeof apiProviders !== 'object') continue;

    for (const [providerId, providerData] of Object.entries(
      apiProviders as Record<string, Record<string, unknown>>,
    )) {
      if (!providerData || typeof providerData !== 'object') continue;

      const apiKey = (providerData.apiKey as string) || '';
      const baseUrl = (providerData.baseUrl as string) || undefined;
      const models = Array.isArray(providerData.models)
        ? (providerData.models as string[])
        : undefined;
      const enabled = providerData.enabled !== false;

      if (!enabled) continue;
      if (!apiKey && !baseUrl) continue;

      if (base[configKey][providerId]) {
        if (apiKey) base[configKey][providerId].apiKey = apiKey;
        if (baseUrl) base[configKey][providerId].baseUrl = baseUrl;
        if (models && models.length > 0) base[configKey][providerId].models = models;
      } else {
        base[configKey][providerId] = { apiKey, baseUrl, models };
      }
    }
  }

  return base;
}

// ---------------------------------------------------------------------------
// Env-var prefix mappings
// ---------------------------------------------------------------------------

const LLM_ENV_MAP: Record<string, string> = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GOOGLE: 'google',
  DEEPSEEK: 'deepseek',
  QWEN: 'qwen',
  DASHSCOPE: 'qwen',
  KIMI: 'kimi',
  MINIMAX: 'minimax',
  GLM: 'glm',
  SILICONFLOW: 'siliconflow',
  DOUBAO: 'doubao',
  OPENROUTER: 'openrouter',
  GROK: 'grok',
  TENCENT: 'tencent-hunyuan',
  TENCENT_HUNYUAN: 'tencent-hunyuan',
  XIAOMI: 'xiaomi',
  MIMO: 'xiaomi',
  OLLAMA: 'ollama',
};

const TTS_ENV_MAP: Record<string, string> = {
  TTS_OPENAI: 'openai-tts',
  TTS_AZURE: 'azure-tts',
  TTS_GLM: 'glm-tts',
  TTS_QWEN: 'qwen-tts',
  TTS_VOXCPM: 'voxcpm-tts',
  TTS_DOUBAO: 'doubao-tts',
  TTS_ELEVENLABS: 'elevenlabs-tts',
  TTS_MINIMAX: 'minimax-tts',
};

const ASR_ENV_MAP: Record<string, string> = {
  ASR_OPENAI: 'openai-whisper',
  ASR_QWEN: 'qwen-asr',
};

const PDF_ENV_MAP: Record<string, string> = {
  PDF_UNPDF: 'unpdf',
  PDF_MINERU: 'mineru',
  PDF_MINERU_CLOUD: 'mineru-cloud',
};

const IMAGE_ENV_MAP: Record<string, string> = {
  IMAGE_OPENAI: 'openai-image',
  IMAGE_SEEDREAM: 'seedream',
  IMAGE_QWEN_IMAGE: 'qwen-image',
  IMAGE_NANO_BANANA: 'nano-banana',
  IMAGE_MINIMAX: 'minimax-image',
  IMAGE_GROK: 'grok-image',
};

const VIDEO_ENV_MAP: Record<string, string> = {
  VIDEO_SEEDANCE: 'seedance',
  VIDEO_KLING: 'kling',
  VIDEO_VEO: 'veo',
  VIDEO_SORA: 'sora',
  VIDEO_MINIMAX: 'minimax-video',
  VIDEO_GROK: 'grok-video',
};

const WEB_SEARCH_ENV_MAP: Record<string, string> = {
  TAVILY: 'tavily',
};

// ---------------------------------------------------------------------------
// YAML loading
// ---------------------------------------------------------------------------

type YamlData = Partial<{
  providers: Record<string, Partial<ServerProviderEntry>>;
  tts: Record<string, Partial<ServerProviderEntry>>;
  asr: Record<string, Partial<ServerProviderEntry>>;
  pdf: Record<string, Partial<ServerProviderEntry>>;
  image: Record<string, Partial<ServerProviderEntry>>;
  video: Record<string, Partial<ServerProviderEntry>>;
  'web-search': Record<string, Partial<ServerProviderEntry>>;
}>;

function loadYamlFile(filename: string): YamlData {
  try {
    const filePath = path.join(process.cwd(), filename);
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = yaml.load(raw) as Record<string, unknown> | null;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as YamlData;
  } catch (e) {
    log.warn(`[ServerProviderConfig] Failed to load ${filename}:`, e);
    return {};
  }
}

// ---------------------------------------------------------------------------
// Env-var helpers
// ---------------------------------------------------------------------------

function loadEnvSection(
  envMap: Record<string, string>,
  yamlSection: Record<string, Partial<ServerProviderEntry>> | undefined,
  {
    requiresBaseUrl = false,
    keylessProviders = new Set<string>(),
  }: { requiresBaseUrl?: boolean; keylessProviders?: Set<string> } = {},
): Record<string, ServerProviderEntry> {
  const result: Record<string, ServerProviderEntry> = {};

  if (yamlSection) {
    for (const [id, entry] of Object.entries(yamlSection)) {
      if (
        requiresBaseUrl
          ? !!entry?.baseUrl
          : entry?.apiKey || (entry?.baseUrl && keylessProviders.has(id))
      ) {
        result[id] = {
          apiKey: entry.apiKey || '',
          baseUrl: entry.baseUrl,
          models: entry.models,
          proxy: entry.proxy,
        };
      }
    }
  }

  for (const [prefix, providerId] of Object.entries(envMap)) {
    const envApiKey = process.env[`${prefix}_API_KEY`] || undefined;
    const envBaseUrl = process.env[`${prefix}_BASE_URL`] || undefined;
    const envModelsStr = process.env[`${prefix}_MODELS`];
    const envModels = envModelsStr
      ? envModelsStr
          .split(',')
          .map((m) => m.trim())
          .filter(Boolean)
      : undefined;

    if (result[providerId]) {
      if (envApiKey) result[providerId].apiKey = envApiKey;
      if (envBaseUrl) result[providerId].baseUrl = envBaseUrl;
      if (envModels) result[providerId].models = envModels;
      continue;
    }

    if (
      requiresBaseUrl
        ? !envBaseUrl
        : !(envApiKey || (envBaseUrl && keylessProviders.has(providerId)))
    )
      continue;
    result[providerId] = {
      apiKey: envApiKey || '',
      baseUrl: envBaseUrl,
      models: envModels,
    };
  }

  return result;
}

// ---------------------------------------------------------------------------
// Module-level cache (process singleton)
// ---------------------------------------------------------------------------

const DEFAULT_FILENAME = 'server-providers.yml';

const _configs: Map<string, ServerConfig> = new Map();

let _mergedConfig: ServerConfig | null = null;
let _backgroundRefreshStarted = false;

function startBackgroundRefresh(): void {
  if (_backgroundRefreshStarted) return;
  _backgroundRefreshStarted = true;

  fetchApiMgmtConfig()
    .then((data) => {
      if (data) {
        const base = getConfig();
        const merged = mergeApiMgmtConfig(JSON.parse(JSON.stringify(base)), data);
        _mergedConfig = merged;
        logConfig(merged, 'background-refresh');
      }
    })
    .catch(() => {});

  setInterval(async () => {
    try {
      const data = await fetchApiMgmtConfig();
      if (data) {
        const base = getConfig();
        const merged = mergeApiMgmtConfig(JSON.parse(JSON.stringify(base)), data);
        _mergedConfig = merged;
      }
    } catch {}
  }, API_MGMT_CACHE_TTL);
}

function buildConfig(yamlData: YamlData): ServerConfig {
  return {
    providers: loadEnvSection(LLM_ENV_MAP, yamlData.providers, {
      keylessProviders: new Set(['ollama']),
    }),
    tts: loadEnvSection(TTS_ENV_MAP, yamlData.tts, {
      keylessProviders: new Set(['voxcpm-tts']),
    }),
    asr: loadEnvSection(ASR_ENV_MAP, yamlData.asr),
    pdf: loadEnvSection(PDF_ENV_MAP, yamlData.pdf, { requiresBaseUrl: true }),
    image: loadEnvSection(IMAGE_ENV_MAP, yamlData.image),
    video: loadEnvSection(VIDEO_ENV_MAP, yamlData.video),
    webSearch: loadEnvSection(WEB_SEARCH_ENV_MAP, yamlData['web-search']),
  };
}

function logConfig(config: ServerConfig, label: string): void {
  const counts = [
    Object.keys(config.providers).length,
    Object.keys(config.tts).length,
    Object.keys(config.asr).length,
    Object.keys(config.pdf).length,
    Object.keys(config.image).length,
    Object.keys(config.video).length,
    Object.keys(config.webSearch).length,
  ];
  if (counts.some((c) => c > 0)) {
    log.info(
      `[ServerProviderConfig] Loaded (${label}): ${counts[0]} LLM, ${counts[1]} TTS, ${counts[2]} ASR, ${counts[3]} PDF, ${counts[4]} Image, ${counts[5]} Video, ${counts[6]} WebSearch providers`,
    );
  }
}

function getConfig(): ServerConfig {
  const cached = _configs.get('');
  if (cached) return cached;

  const yamlData = loadYamlFile(DEFAULT_FILENAME);
  const config = buildConfig(yamlData);
  logConfig(config, DEFAULT_FILENAME);
  _configs.set('', config);
  return config;
}

/** Get config with unified API management service data merged in (async) */
export async function getConfigWithApiMgmt(): Promise<ServerConfig> {
  const baseConfig = getConfig();
  const apiMgmtData = await fetchApiMgmtConfig();

  if (apiMgmtData) {
    const merged = mergeApiMgmtConfig(
      JSON.parse(JSON.stringify(baseConfig)),
      apiMgmtData,
    );
    logConfig(merged, 'unified-api-mgmt');
    _mergedConfig = merged;
    return merged;
  }

  _mergedConfig = baseConfig;
  return baseConfig;
}

/** Invalidate the API management cache to force a refresh on next request */
export function invalidateApiMgmtCache(): void {
  _apiMgmtCache = { data: null, timestamp: 0 };
  _configs.delete('');
  _mergedConfig = null;
}

function getResolvedConfig(): ServerConfig {
  startBackgroundRefresh();
  if (_mergedConfig) return _mergedConfig;
  return getConfig();
}

export async function ensureApiMgmtConfig(): Promise<void> {
  if (_mergedConfig) return;
  try {
    const data = await fetchApiMgmtConfig();
    if (data) {
      const base = getConfig();
      _mergedConfig = mergeApiMgmtConfig(JSON.parse(JSON.stringify(base)), data);
    }
  } catch {}
}

// ---------------------------------------------------------------------------
// Public API — LLM
// ---------------------------------------------------------------------------

/** Returns server-configured LLM providers (no apiKeys) */
export function getServerProviders(): Record<string, { models?: string[]; baseUrl?: string }> {
  const cfg = getResolvedConfig();
  const result: Record<string, { models?: string[]; baseUrl?: string }> = {};
  for (const [id, entry] of Object.entries(cfg.providers)) {
    result[id] = {};
    if (entry.models && entry.models.length > 0) result[id].models = entry.models;
    if (entry.baseUrl) result[id].baseUrl = entry.baseUrl;
  }
  return result;
}

/** Resolve API key: client key > server key > empty string */
export function resolveApiKey(providerId: string, clientKey?: string): string {
  if (clientKey) return clientKey;
  return getResolvedConfig().providers[providerId]?.apiKey || '';
}

/** Resolve base URL: client > server > undefined */
export function resolveBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  if (clientBaseUrl) return clientBaseUrl;
  return getResolvedConfig().providers[providerId]?.baseUrl;
}

/** Resolve proxy URL for a provider (server config only) */
export function resolveProxy(providerId: string): string | undefined {
  return getResolvedConfig().providers[providerId]?.proxy;
}

// ---------------------------------------------------------------------------
// Public API — TTS
// ---------------------------------------------------------------------------

export function getServerTTSProviders(): Record<string, { baseUrl?: string }> {
  const cfg = getResolvedConfig();
  const result: Record<string, { baseUrl?: string }> = {};
  for (const [id, entry] of Object.entries(cfg.tts)) {
    result[id] = {};
    if (entry.baseUrl) result[id].baseUrl = entry.baseUrl;
  }
  return result;
}

export function resolveTTSApiKey(providerId: string, clientKey?: string): string {
  if (clientKey) return clientKey;
  return getResolvedConfig().tts[providerId]?.apiKey || '';
}

export function resolveTTSBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  if (clientBaseUrl) return clientBaseUrl;
  return getResolvedConfig().tts[providerId]?.baseUrl;
}

// ---------------------------------------------------------------------------
// Public API — ASR
// ---------------------------------------------------------------------------

export function getServerASRProviders(): Record<string, { baseUrl?: string }> {
  const cfg = getResolvedConfig();
  const result: Record<string, { baseUrl?: string }> = {};
  for (const [id, entry] of Object.entries(cfg.asr)) {
    result[id] = {};
    if (entry.baseUrl) result[id].baseUrl = entry.baseUrl;
  }
  return result;
}

export function resolveASRApiKey(providerId: string, clientKey?: string): string {
  if (clientKey) return clientKey;
  return getResolvedConfig().asr[providerId]?.apiKey || '';
}

export function resolveASRBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  if (clientBaseUrl) return clientBaseUrl;
  return getResolvedConfig().asr[providerId]?.baseUrl;
}

// ---------------------------------------------------------------------------
// Public API — PDF
// ---------------------------------------------------------------------------

export function getServerPDFProviders(): Record<string, { baseUrl?: string }> {
  const cfg = getResolvedConfig();
  const result: Record<string, { baseUrl?: string }> = {};
  for (const [id, entry] of Object.entries(cfg.pdf)) {
    result[id] = {};
    if (entry.baseUrl) result[id].baseUrl = entry.baseUrl;
  }
  return result;
}

export function resolvePDFApiKey(providerId: string, clientKey?: string): string {
  if (clientKey) return clientKey;
  return getResolvedConfig().pdf[providerId]?.apiKey || '';
}

export function resolvePDFBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  if (clientBaseUrl) return clientBaseUrl;
  return getResolvedConfig().pdf[providerId]?.baseUrl;
}

// ---------------------------------------------------------------------------
// Public API — Image Generation
// ---------------------------------------------------------------------------

export function getServerImageProviders(): Record<string, { baseUrl?: string }> {
  const cfg = getResolvedConfig();
  const result: Record<string, { baseUrl?: string }> = {};
  for (const [id, entry] of Object.entries(cfg.image)) {
    result[id] = {};
    if (entry.baseUrl) result[id].baseUrl = entry.baseUrl;
  }
  return result;
}

export function resolveImageApiKey(providerId: string, clientKey?: string): string {
  if (clientKey) return clientKey;
  return getResolvedConfig().image[providerId]?.apiKey || '';
}

export function resolveImageBaseUrl(
  providerId: string,
  clientBaseUrl?: string,
): string | undefined {
  if (clientBaseUrl) return clientBaseUrl;
  return getResolvedConfig().image[providerId]?.baseUrl;
}

// ---------------------------------------------------------------------------
// Public API — Video Generation
// ---------------------------------------------------------------------------

export function getServerVideoProviders(): Record<string, { baseUrl?: string }> {
  const cfg = getResolvedConfig();
  const result: Record<string, { baseUrl?: string }> = {};
  for (const [id, entry] of Object.entries(cfg.video)) {
    result[id] = {};
    if (entry.baseUrl) result[id].baseUrl = entry.baseUrl;
  }
  return result;
}

export function resolveVideoApiKey(providerId: string, clientKey?: string): string {
  if (clientKey) return clientKey;
  return getResolvedConfig().video[providerId]?.apiKey || '';
}

export function resolveVideoBaseUrl(
  providerId: string,
  clientBaseUrl?: string,
): string | undefined {
  if (clientBaseUrl) return clientBaseUrl;
  return getResolvedConfig().video[providerId]?.baseUrl;
}

// ---------------------------------------------------------------------------
// Public API — Web Search (Tavily)
// ---------------------------------------------------------------------------

/** Returns server-configured web search providers (no apiKeys exposed) */
export function getServerWebSearchProviders(): Record<string, { baseUrl?: string }> {
  const cfg = getResolvedConfig();
  const result: Record<string, { baseUrl?: string }> = {};
  for (const [id, entry] of Object.entries(cfg.webSearch)) {
    result[id] = {};
    if (entry.baseUrl) result[id].baseUrl = entry.baseUrl;
  }
  return result;
}

/** Resolve Tavily API key: client key > server key > TAVILY_API_KEY env > empty */
export function resolveWebSearchApiKey(clientKey?: string): string {
  if (clientKey) return clientKey;
  const serverKey = getResolvedConfig().webSearch.tavily?.apiKey;
  if (serverKey) return serverKey;
  return process.env.TAVILY_API_KEY || '';
}
