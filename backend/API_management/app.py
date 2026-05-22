#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
import re
import threading
import logging
import argparse
import traceback
from pathlib import Path
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

CONFIG_FILE = Path(__file__).parent / "api_config.json"
LOCK = threading.Lock()

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] [%(levelname)s] %(message)s')
log = logging.getLogger('APIManager')

PROVIDER_REGISTRY = {
    "llm": {
        "openai": {"name": "OpenAI", "baseUrl": "https://api.openai.com/v1", "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"], "providerType": "openai"},
        "anthropic": {"name": "Anthropic", "baseUrl": "https://api.anthropic.com", "models": ["claude-sonnet-4-20250514", "claude-3-5-haiku-20241022", "claude-3-opus-20240229"], "providerType": "anthropic"},
        "google": {"name": "Google", "baseUrl": "https://generativelanguage.googleapis.com", "models": ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"], "providerType": "google"},
        "deepseek": {"name": "DeepSeek", "baseUrl": "https://api.deepseek.com/v1", "models": ["deepseek-chat", "deepseek-reasoner"], "providerType": "openai"},
        "qwen": {"name": "Qwen (通义千问)", "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1", "models": ["qwen-plus", "qwen-turbo", "qwen-max"], "providerType": "openai"},
        "kimi": {"name": "Kimi (月之暗面)", "baseUrl": "https://api.moonshot.cn/v1", "models": ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"], "providerType": "openai"},
        "minimax": {"name": "MiniMax", "baseUrl": "https://api.minimaxi.com/anthropic/v1", "models": [], "providerType": "anthropic"},
        "glm": {"name": "GLM (智谱)", "baseUrl": "https://open.bigmodel.cn/api/paas/v4", "models": ["glm-4-plus", "glm-4-flash", "glm-4"], "providerType": "openai"},
        "siliconflow": {"name": "SiliconFlow", "baseUrl": "https://api.siliconflow.cn/v1", "models": [], "providerType": "openai"},
        "doubao": {"name": "Doubao (豆包)", "baseUrl": "https://ark.cn-beijing.volces.com/api/v3", "models": [], "providerType": "openai"},
        "openrouter": {"name": "OpenRouter", "baseUrl": "https://openrouter.ai/api/v1", "models": [], "providerType": "openai"},
        "grok": {"name": "Grok (xAI)", "baseUrl": "https://api.x.ai/v1", "models": ["grok-3", "grok-3-mini"], "providerType": "openai"},
        "tencent-hunyuan": {"name": "Tencent Hunyuan (腾讯混元)", "baseUrl": "https://tokenhub.tencentmaas.com/v1", "models": [], "providerType": "openai"},
        "xiaomi": {"name": "Xiaomi (小米)", "baseUrl": "https://api.xiaomimimo.com/v1", "models": [], "providerType": "openai"},
        "ollama": {"name": "Ollama (本地)", "baseUrl": "http://localhost:11434/v1", "models": [], "providerType": "openai", "requiresApiKey": False},
    },
    "tts": {
        "openai-tts": {"name": "OpenAI TTS", "baseUrl": "https://api.openai.com/v1"},
        "azure-tts": {"name": "Azure TTS", "baseUrl": ""},
        "glm-tts": {"name": "GLM TTS", "baseUrl": "https://open.bigmodel.cn/api/paas/v4"},
        "qwen-tts": {"name": "Qwen TTS", "baseUrl": "https://dashscope.aliyuncs.com/api/v1"},
        "voxcpm-tts": {"name": "VoxCPM TTS", "baseUrl": "", "requiresApiKey": False},
        "doubao-tts": {"name": "Doubao TTS", "baseUrl": ""},
        "elevenlabs-tts": {"name": "ElevenLabs TTS", "baseUrl": "https://api.elevenlabs.io"},
        "minimax-tts": {"name": "MiniMax TTS", "baseUrl": "https://api.minimaxi.com"},
    },
    "asr": {
        "openai-whisper": {"name": "OpenAI Whisper", "baseUrl": "https://api.openai.com/v1"},
        "qwen-asr": {"name": "Qwen ASR", "baseUrl": "https://dashscope.aliyuncs.com/api/v1"},
    },
    "pdf": {
        "unpdf": {"name": "UnPDF", "baseUrl": "", "requiresApiKey": False},
        "mineru": {"name": "MinerU", "baseUrl": "", "requiresApiKey": False},
        "mineru-cloud": {"name": "MinerU Cloud", "baseUrl": ""},
    },
    "image": {
        "openai-image": {"name": "OpenAI Image (DALL-E)", "baseUrl": "https://api.openai.com/v1"},
        "seedream": {"name": "SeedReam", "baseUrl": ""},
        "qwen-image": {"name": "Qwen Image", "baseUrl": ""},
        "nano-banana": {"name": "Nano Banana", "baseUrl": ""},
        "minimax-image": {"name": "MiniMax Image", "baseUrl": "https://api.minimaxi.com"},
        "grok-image": {"name": "Grok Image", "baseUrl": ""},
    },
    "video": {
        "seedance": {"name": "SeedAnce", "baseUrl": ""},
        "kling": {"name": "Kling (可灵)", "baseUrl": ""},
        "veo": {"name": "Veo (Google)", "baseUrl": ""},
        "sora": {"name": "Sora (OpenAI)", "baseUrl": ""},
        "minimax-video": {"name": "MiniMax Video", "baseUrl": "https://api.minimaxi.com"},
        "grok-video": {"name": "Grok Video", "baseUrl": ""},
    },
    "webSearch": {
        "tavily": {"name": "Tavily", "baseUrl": "https://api.tavily.com"},
    },
}

DEFAULT_CONFIG = {}
for category, providers in PROVIDER_REGISTRY.items():
    DEFAULT_CONFIG[category] = {}
    for pid, meta in providers.items():
        DEFAULT_CONFIG[category][pid] = {
            "apiKey": "",
            "baseUrl": meta.get("baseUrl", ""),
            "models": meta.get("models", []),
            "enabled": True,
        }
DEFAULT_CONFIG["globalSettings"] = {
    "defaultModel": "",
    "accessCode": "",
    "allowLocalNetworks": False,
}


def load_config():
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                saved = json.load(f)
            merged = json.loads(json.dumps(DEFAULT_CONFIG))
            for category in merged:
                if category in saved and isinstance(saved[category], dict):
                    if category == "globalSettings":
                        merged[category].update(saved[category])
                    else:
                        for provider_id, provider_data in saved[category].items():
                            if provider_id in merged[category]:
                                merged[category][provider_id].update(provider_data)
                            else:
                                merged[category][provider_id] = provider_data
            return merged
        except (json.JSONDecodeError, IOError, OSError) as e:
            log.error(f"加载配置文件失败: {e}")
            return json.loads(json.dumps(DEFAULT_CONFIG))
    return json.loads(json.dumps(DEFAULT_CONFIG))


def save_config(config):
    with LOCK:
        try:
            with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
                json.dump(config, f, ensure_ascii=False, indent=2)
        except (IOError, OSError) as e:
            log.error(f"保存配置文件失败: {e}")
            raise


def load_env_overrides(config):
    env_map = {
        "llm": {
            "OPENAI": "openai", "ANTHROPIC": "anthropic", "GOOGLE": "google",
            "DEEPSEEK": "deepseek", "QWEN": "qwen", "KIMI": "kimi",
            "MINIMAX": "minimax", "GLM": "glm", "SILICONFLOW": "siliconflow",
            "DOUBAO": "doubao", "OPENROUTER": "openrouter", "GROK": "grok",
            "TENCENT": "tencent-hunyuan", "TENCENT_HUNYUAN": "tencent-hunyuan",
            "XIAOMI": "xiaomi", "MIMO": "xiaomi", "OLLAMA": "ollama",
        },
        "tts": {
            "TTS_OPENAI": "openai-tts", "TTS_AZURE": "azure-tts",
            "TTS_GLM": "glm-tts", "TTS_QWEN": "qwen-tts",
            "TTS_VOXCPM": "voxcpm-tts", "TTS_DOUBAO": "doubao-tts",
            "TTS_ELEVENLABS": "elevenlabs-tts", "TTS_MINIMAX": "minimax-tts",
        },
        "asr": {
            "ASR_OPENAI": "openai-whisper", "ASR_QWEN": "qwen-asr",
        },
        "pdf": {
            "PDF_UNPDF": "unpdf", "PDF_MINERU": "mineru", "PDF_MINERU_CLOUD": "mineru-cloud",
        },
        "image": {
            "IMAGE_OPENAI": "openai-image", "IMAGE_SEEDREAM": "seedream",
            "IMAGE_QWEN_IMAGE": "qwen-image", "IMAGE_NANO_BANANA": "nano-banana",
            "IMAGE_MINIMAX": "minimax-image", "IMAGE_GROK": "grok-image",
        },
        "video": {
            "VIDEO_SEEDANCE": "seedance", "VIDEO_KLING": "kling",
            "VIDEO_VEO": "veo", "VIDEO_SORA": "sora",
            "VIDEO_MINIMAX": "minimax-video", "VIDEO_GROK": "grok-video",
        },
        "webSearch": {
            "TAVILY": "tavily",
        },
    }

    for category, mapping in env_map.items():
        for prefix, provider_id in mapping.items():
            env_key = os.environ.get(f"{prefix}_API_KEY", "")
            env_base = os.environ.get(f"{prefix}_BASE_URL", "")
            env_models = os.environ.get(f"{prefix}_MODELS", "")
            if env_key or env_base:
                if provider_id not in config.get(category, {}):
                    config.setdefault(category, {})[provider_id] = {"apiKey": "", "baseUrl": "", "models": [], "enabled": True}
                if env_key:
                    config[category][provider_id]["apiKey"] = env_key
                if env_base:
                    config[category][provider_id]["baseUrl"] = env_base
                if env_models:
                    config[category][provider_id]["models"] = [m.strip() for m in env_models.split(",") if m.strip()]

    if os.environ.get("DEFAULT_MODEL"):
        config["globalSettings"]["defaultModel"] = os.environ["DEFAULT_MODEL"]
    if os.environ.get("ACCESS_CODE"):
        config["globalSettings"]["accessCode"] = os.environ["ACCESS_CODE"]
    if os.environ.get("ALLOW_LOCAL_NETWORKS", "").lower() in ("true", "1", "yes"):
        config["globalSettings"]["allowLocalNetworks"] = True

    return config


current_config = load_env_overrides(load_config())
save_config(current_config)


def is_provider_configured(category, provider_id, config=None):
    if config is None:
        config = current_config
    if category not in config or provider_id not in config[category]:
        return False
    data = config[category][provider_id]
    registry_meta = PROVIDER_REGISTRY.get(category, {}).get(provider_id, {})
    requires_api_key = registry_meta.get("requiresApiKey", True)
    api_key = data.get("apiKey", "").strip() if isinstance(data.get("apiKey"), str) else ""
    base_url = data.get("baseUrl", "").strip() if isinstance(data.get("baseUrl"), str) else ""
    default_base_url = registry_meta.get("baseUrl", "")
    if requires_api_key:
        return bool(api_key)
    else:
        return bool(base_url) and base_url != default_base_url


def get_provider_config_status(category, provider_id, config=None):
    if config is None:
        config = current_config
    if category not in config or provider_id not in config[category]:
        return {"status": "not_found", "missing": ["provider"]}
    data = config[category][provider_id]
    registry_meta = PROVIDER_REGISTRY.get(category, {}).get(provider_id, {})
    requires_api_key = registry_meta.get("requiresApiKey", True)
    api_key = data.get("apiKey", "").strip() if isinstance(data.get("apiKey"), str) else ""
    base_url = data.get("baseUrl", "").strip() if isinstance(data.get("baseUrl"), str) else ""
    default_base_url = registry_meta.get("baseUrl", "")
    models = data.get("models", [])
    enabled = data.get("enabled", True)
    missing = []
    if requires_api_key and not api_key:
        missing.append("apiKey")
    if not requires_api_key and not base_url:
        missing.append("baseUrl")
    if not base_url and not default_base_url:
        missing.append("baseUrl")
    if category == "llm" and not models:
        missing.append("models")
    if not enabled:
        return {"status": "disabled", "missing": missing}
    if not missing:
        return {"status": "configured", "missing": []}
    if requires_api_key and api_key:
        return {"status": "incomplete", "missing": missing}
    return {"status": "unconfigured", "missing": missing}


def validate_provider_config(data, category, provider_id):
    errors = {}
    api_key = data.get("apiKey", "").strip() if isinstance(data.get("apiKey"), str) else ""
    base_url = data.get("baseUrl", "").strip() if isinstance(data.get("baseUrl"), str) else ""
    models = data.get("models", [])

    if base_url:
        url_pattern = re.compile(r'^https?://[^\s]+$')
        if not url_pattern.match(base_url):
            errors["baseUrl"] = "API URL 格式无效，请输入完整的 HTTP/HTTPS 地址（如 https://api.example.com/v1）"

    if api_key and len(api_key) < 8:
        errors["apiKey"] = "API Key 长度不能少于8个字符"

    if category == "llm" and isinstance(models, list):
        for i, model in enumerate(models):
            if not isinstance(model, str) or not model.strip():
                errors.setdefault("models", f"模型列表中第 {i+1} 项无效")
                break

    if not isinstance(models, list):
        errors["models"] = "模型列表必须是数组格式"

    return errors


MAIN_ENV_MAP = {
    "llm": {
        "openai": "OPENAI", "anthropic": "ANTHROPIC", "google": "GOOGLE",
        "deepseek": "DEEPSEEK", "qwen": "DASHSCOPE", "kimi": "KIMI",
        "minimax": "MINIMAX", "glm": "GLM", "siliconflow": "SILICONFLOW",
        "doubao": "DOUBAO", "openrouter": "OPENROUTER", "grok": "GROK",
        "tencent-hunyuan": "TENCENT", "xiaomi": "XIAOMI", "ollama": "OLLAMA",
    },
    "tts": {
        "openai-tts": "TTS_OPENAI", "azure-tts": "TTS_AZURE",
        "glm-tts": "TTS_GLM", "qwen-tts": "TTS_QWEN",
        "voxcpm-tts": "TTS_VOXCPM", "doubao-tts": "TTS_DOUBAO",
        "elevenlabs-tts": "TTS_ELEVENLABS", "minimax-tts": "TTS_MINIMAX",
    },
    "asr": {
        "openai-whisper": "ASR_OPENAI", "qwen-asr": "ASR_QWEN",
    },
    "image": {
        "openai-image": "IMAGE_OPENAI", "seedream": "IMAGE_SEEDREAM",
        "qwen-image": "IMAGE_QWEN_IMAGE", "nano-banana": "IMAGE_NANO_BANANA",
        "minimax-image": "IMAGE_MINIMAX", "grok-image": "IMAGE_GROK",
    },
    "video": {
        "seedance": "VIDEO_SEEDANCE", "kling": "VIDEO_KLING",
        "veo": "VIDEO_VEO", "sora": "VIDEO_SORA",
        "minimax-video": "VIDEO_MINIMAX", "grok-video": "VIDEO_GROK",
    },
    "webSearch": {
        "tavily": "TAVILY",
    },
}


def _sync_env_file(env_file, env_map, header_comment="Auto-generated by Teacher Assistant API Manager"):
    existing_env = {}
    if env_file.exists():
        try:
            with open(env_file, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, _, value = line.partition('=')
                        existing_env[key.strip()] = value.strip()
        except (IOError, OSError) as e:
            log.warning(f"读取环境变量文件失败 {env_file}: {e}")

    for category, mapping in env_map.items():
        for provider_id, env_prefix in mapping.items():
            if provider_id in current_config.get(category, {}):
                data = current_config[category][provider_id]
                if data.get("apiKey"):
                    existing_env[f"{env_prefix}_API_KEY"] = data["apiKey"]
                if data.get("baseUrl"):
                    existing_env[f"{env_prefix}_BASE_URL"] = data["baseUrl"]
                if data.get("models"):
                    existing_env[f"{env_prefix}_MODELS"] = ",".join(data["models"])

    if current_config.get("globalSettings", {}).get("defaultModel"):
        existing_env["DEFAULT_MODEL"] = current_config["globalSettings"]["defaultModel"]
    if current_config.get("globalSettings", {}).get("accessCode"):
        existing_env["ACCESS_CODE"] = current_config["globalSettings"]["accessCode"]
    if current_config.get("globalSettings", {}).get("allowLocalNetworks"):
        existing_env["ALLOW_LOCAL_NETWORKS"] = "true"

    try:
        with open(env_file, 'w', encoding='utf-8') as f:
            f.write(f"# {header_comment}\n")
            f.write(f"# Last updated: {datetime.now().isoformat()}\n\n")
            for key, value in sorted(existing_env.items()):
                f.write(f"{key}={value}\n")
    except (IOError, OSError) as e:
        log.error(f"写入环境变量文件失败 {env_file}: {e}")
        raise


def auto_sync_to_env():
    synced_files = []
    try:
        backend_env = Path(__file__).parent.parent / ".env"
        _sync_env_file(backend_env, MAIN_ENV_MAP, "Teacher Assistant AI - Unified API Configuration")
        synced_files.append(str(backend_env))
        log.info(f"Auto-synced config to {backend_env}")

        root_env = Path(__file__).parent.parent.parent / ".env"
        if root_env.exists() and root_env != backend_env:
            _sync_env_file(root_env, MAIN_ENV_MAP, "Teacher Assistant AI - Environment Variables")
            synced_files.append(str(root_env))
            log.info(f"Auto-synced config to {root_env}")

        return True, synced_files
    except Exception as e:
        log.error(f"Auto-sync to env failed: {e}")
        return False, []


THEME_FILE = Path(__file__).parent / "theme_state.json"


def _load_theme():
    if THEME_FILE.exists():
        try:
            with open(THEME_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return {"theme": "light", "updatedAt": None}


def _save_theme(theme_data):
    with LOCK:
        try:
            with open(THEME_FILE, 'w', encoding='utf-8') as f:
                json.dump(theme_data, f, ensure_ascii=False, indent=2)
        except (IOError, OSError) as e:
            log.error(f"保存主题状态失败: {e}")


@app.route('/api/theme', methods=['GET'])
def get_theme():
    return jsonify(_load_theme())


@app.route('/api/theme', methods=['POST'])
def set_theme():
    data = request.get_json(silent=True)
    if not data or 'theme' not in data:
        return jsonify({"error": "theme field is required"}), 400
    theme = data['theme']
    if theme not in ('light', 'dark'):
        return jsonify({"error": "theme must be 'light' or 'dark'"}), 400
    theme_data = {"theme": theme, "updatedAt": datetime.now().isoformat()}
    _save_theme(theme_data)
    log.info(f"Theme updated to: {theme}")
    return jsonify(theme_data)


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})


@app.route('/api/providers', methods=['GET'])
def get_provider_registry():
    result = {}
    for category, providers in PROVIDER_REGISTRY.items():
        result[category] = {}
        for pid, meta in providers.items():
            result[category][pid] = {
                "name": meta["name"],
                "defaultBaseUrl": meta.get("baseUrl", ""),
                "defaultModels": meta.get("models", []),
                "providerType": meta.get("providerType", ""),
                "requiresApiKey": meta.get("requiresApiKey", True),
            }
    return jsonify(result)


@app.route('/api/config/status', methods=['GET'])
def get_config_status():
    category = request.args.get('category')
    result = {}
    categories_to_check = [category] if category and category in current_config else [c for c in current_config if c != "globalSettings"]
    for cat in categories_to_check:
        if cat == "globalSettings":
            continue
        result[cat] = {}
        for pid in current_config.get(cat, {}):
            result[cat][pid] = get_provider_config_status(cat, pid)
    return jsonify(result)


@app.route('/api/config/status/<category>/<provider_id>', methods=['GET'])
def get_single_provider_status(category, provider_id):
    if category not in current_config or category == "globalSettings":
        return jsonify({"error": f"Unknown category: {category}"}), 404
    if provider_id not in current_config.get(category, {}):
        return jsonify({"error": f"Unknown provider: {provider_id}"}), 404
    status = get_provider_config_status(category, provider_id)
    return jsonify(status)


@app.route('/api/config', methods=['GET'])
def get_config():
    category = request.args.get('category')
    if category:
        if category in current_config:
            return jsonify({category: current_config[category]})
        return jsonify({"error": f"Unknown category: {category}"}), 404
    return jsonify(current_config)


@app.route('/api/config/<category>/<provider_id>', methods=['GET'])
def get_provider_config(category, provider_id):
    if category not in current_config:
        return jsonify({"error": f"Unknown category: {category}"}), 404
    if category == "globalSettings":
        return jsonify(current_config["globalSettings"])
    if provider_id not in current_config[category]:
        return jsonify({"error": f"Unknown provider: {provider_id}"}), 404
    return jsonify(current_config[category][provider_id])


@app.route('/api/config/<category>/<provider_id>', methods=['PUT'])
def update_provider_config(category, provider_id):
    global current_config
    if category not in current_config:
        return jsonify({"error": f"Unknown category: {category}"}), 404
    if category == "globalSettings":
        return jsonify({"error": "Use /api/config/global to update global settings"}), 400

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    errors = validate_provider_config(data, category, provider_id)
    if errors:
        return jsonify({"success": False, "errors": errors}), 422

    if provider_id not in current_config[category]:
        current_config[category][provider_id] = {"apiKey": "", "baseUrl": "", "models": [], "enabled": True}

    if "apiKey" in data:
        val = data["apiKey"]
        current_config[category][provider_id]["apiKey"] = val.strip() if isinstance(val, str) else val
    if "baseUrl" in data:
        val = data["baseUrl"]
        current_config[category][provider_id]["baseUrl"] = val.strip() if isinstance(val, str) else val
    if "models" in data:
        current_config[category][provider_id]["models"] = data["models"]
    if "enabled" in data:
        current_config[category][provider_id]["enabled"] = bool(data["enabled"])

    try:
        save_config(current_config)
    except Exception as e:
        return jsonify({"success": False, "error": f"保存配置失败: {str(e)}"}), 500

    log.info(f"Updated {category}/{provider_id}")

    sync_ok, sync_files = auto_sync_to_env()
    if not sync_ok:
        log.warning(f"Config saved for {category}/{provider_id} but env sync failed")

    return jsonify({
        "success": True,
        "provider": current_config[category][provider_id],
        "envSynced": sync_ok,
        "syncedFiles": sync_files,
    })


@app.route('/api/config/<category>/<provider_id>', methods=['DELETE'])
def delete_provider_config(category, provider_id):
    global current_config
    if category not in current_config:
        return jsonify({"error": f"Unknown category: {category}"}), 404
    if category == "globalSettings":
        return jsonify({"error": "Cannot delete global settings"}), 400
    if provider_id not in current_config[category]:
        return jsonify({"error": f"Unknown provider: {provider_id}"}), 404

    if provider_id in DEFAULT_CONFIG.get(category, {}):
        current_config[category][provider_id] = json.loads(json.dumps(DEFAULT_CONFIG[category][provider_id]))
    else:
        del current_config[category][provider_id]

    try:
        save_config(current_config)
    except Exception as e:
        return jsonify({"success": False, "error": f"保存配置失败: {str(e)}"}), 500

    log.info(f"Deleted/reset {category}/{provider_id}")

    sync_ok, sync_files = auto_sync_to_env()

    return jsonify({
        "success": True,
        "envSynced": sync_ok,
        "syncedFiles": sync_files,
    })


@app.route('/api/config/global', methods=['PUT'])
def update_global_settings():
    global current_config
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    if "defaultModel" in data:
        current_config["globalSettings"]["defaultModel"] = str(data["defaultModel"])
    if "accessCode" in data:
        current_config["globalSettings"]["accessCode"] = str(data["accessCode"])
    if "allowLocalNetworks" in data:
        current_config["globalSettings"]["allowLocalNetworks"] = bool(data["allowLocalNetworks"])

    try:
        save_config(current_config)
    except Exception as e:
        return jsonify({"success": False, "error": f"保存配置失败: {str(e)}"}), 500

    log.info("Updated global settings")

    sync_ok, sync_files = auto_sync_to_env()

    return jsonify({
        "success": True,
        "globalSettings": current_config["globalSettings"],
        "envSynced": sync_ok,
        "syncedFiles": sync_files,
    })


@app.route('/api/config/<category>', methods=['POST'])
def add_provider(category):
    global current_config
    if category not in current_config or category == "globalSettings":
        return jsonify({"error": f"Cannot add provider to category: {category}"}), 400

    data = request.get_json(silent=True)
    if not data or "providerId" not in data:
        return jsonify({"error": "providerId is required"}), 400

    provider_id = str(data["providerId"]).strip()
    if not provider_id:
        return jsonify({"error": "providerId cannot be empty"}), 400
    if not re.match(r'^[a-zA-Z0-9_-]+$', provider_id):
        return jsonify({"error": "providerId can only contain letters, numbers, hyphens and underscores"}), 400
    if provider_id in current_config[category]:
        return jsonify({"error": f"Provider already exists: {provider_id}"}), 409

    errors = validate_provider_config(data, category, provider_id)
    if errors:
        return jsonify({"success": False, "errors": errors}), 422

    current_config[category][provider_id] = {
        "apiKey": data.get("apiKey", "").strip() if isinstance(data.get("apiKey"), str) else "",
        "baseUrl": data.get("baseUrl", "").strip() if isinstance(data.get("baseUrl"), str) else "",
        "models": data.get("models", []),
        "enabled": data.get("enabled", True),
    }

    try:
        save_config(current_config)
    except Exception as e:
        return jsonify({"success": False, "error": f"保存配置失败: {str(e)}"}), 500

    log.info(f"Added {category}/{provider_id}")

    sync_ok, sync_files = auto_sync_to_env()

    return jsonify({
        "success": True,
        "provider": current_config[category][provider_id],
        "envSynced": sync_ok,
        "syncedFiles": sync_files,
    }), 201


@app.route('/api/openmaic/providers', methods=['GET'])
def get_openmaic_providers():
    result = {
        "providers": {},
        "tts": {},
        "asr": {},
        "pdf": {},
        "image": {},
        "video": {},
        "webSearch": {},
    }

    for provider_id, data in current_config.get("llm", {}).items():
        if is_provider_configured("llm", provider_id) and data.get("enabled", True):
            entry = {}
            if data.get("models"):
                entry["models"] = data["models"]
            if data.get("baseUrl"):
                entry["baseUrl"] = data["baseUrl"]
            registry_meta = PROVIDER_REGISTRY.get("llm", {}).get(provider_id, {})
            if registry_meta.get("providerType"):
                entry["providerType"] = registry_meta["providerType"]
            result["providers"][provider_id] = entry

    for category in ["tts", "asr", "pdf", "image", "video", "webSearch"]:
        for provider_id, data in current_config.get(category, {}).items():
            if is_provider_configured(category, provider_id) and data.get("enabled", True):
                entry = {}
                if data.get("baseUrl"):
                    entry["baseUrl"] = data["baseUrl"]
                result[category][provider_id] = entry

    return jsonify(result)


@app.route('/api/openmaic/resolve-key', methods=['POST'])
def resolve_openmaic_key():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    category = data.get("category", "llm")
    provider_id = data.get("providerId", "")
    client_key = data.get("clientKey", "")

    if client_key:
        return jsonify({"apiKey": client_key})

    if category in current_config and provider_id in current_config.get(category, {}):
        key = current_config[category][provider_id].get("apiKey", "")
        return jsonify({"apiKey": key})

    return jsonify({"apiKey": ""})


@app.route('/api/openmaic/resolve-base-url', methods=['POST'])
def resolve_openmaic_base_url():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    category = data.get("category", "llm")
    provider_id = data.get("providerId", "")
    client_base_url = data.get("clientBaseUrl", "")

    if client_base_url:
        return jsonify({"baseUrl": client_base_url})

    if category in current_config and provider_id in current_config.get(category, {}):
        base_url = current_config[category][provider_id].get("baseUrl", "")
        return jsonify({"baseUrl": base_url})

    return jsonify({"baseUrl": ""})


@app.route('/api/check-model', methods=['POST'])
def check_model_availability():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    category = data.get("category", "llm")
    provider_id = data.get("providerId", "")
    model_id = data.get("modelId", "")

    if not provider_id:
        return jsonify({"available": False, "reason": "未指定供应商", "suggestion": "请在设置中选择一个模型供应商"})

    if category not in current_config or provider_id not in current_config.get(category, {}):
        return jsonify({"available": False, "reason": f"未找到供应商: {provider_id}", "suggestion": "请在 API 统一管理中配置该供应商"})

    status_info = get_provider_config_status(category, provider_id)

    if status_info["status"] == "disabled":
        return jsonify({"available": False, "reason": f"供应商 {provider_id} 已被停用", "suggestion": "请在 API 统一管理中启用该供应商"})

    if status_info["status"] == "unconfigured":
        missing_str = "、".join(status_info["missing"])
        return jsonify({"available": False, "reason": f"供应商 {provider_id} 未配置（缺少: {missing_str}）", "suggestion": "请在 API 统一管理中完成该供应商的配置"})

    if status_info["status"] == "incomplete":
        missing_str = "、".join(status_info["missing"])
        return jsonify({"available": False, "reason": f"供应商 {provider_id} 配置不完整（缺少: {missing_str}）", "suggestion": "请在 API 统一管理中补全该供应商的配置"})

    if category == "llm" and model_id:
        provider_data = current_config[category][provider_id]
        available_models = provider_data.get("models", [])
        if available_models and model_id not in available_models:
            return jsonify({"available": False, "reason": f"模型 {model_id} 不在供应商 {provider_id} 的可用模型列表中", "suggestion": "请在 API 统一管理中添加该模型或选择其他模型"})

    return jsonify({"available": True, "status": status_info["status"]})


@app.route('/api/test-connection', methods=['POST'])
def test_connection():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    provider_type = data.get("providerType", "openai")
    api_key = data.get("apiKey", "")
    base_url = data.get("baseUrl", "")
    model = data.get("model", "")

    if not api_key:
        return jsonify({"success": False, "message": "API Key 不能为空"}), 400

    try:
        import urllib.request
        import urllib.error

        if provider_type == "openai":
            url = (base_url or "https://api.openai.com/v1").rstrip("/") + "/models"
            headers = {"Authorization": f"Bearer {api_key}"}
        elif provider_type == "anthropic":
            url = "https://api.anthropic.com/v1/messages"
            headers = {
                "x-api-key": api_key,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            }
        elif provider_type == "google":
            url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
            headers = {}
        else:
            url = (base_url or "https://api.openai.com/v1").rstrip("/") + "/models"
            headers = {"Authorization": f"Bearer {api_key}"}

        req = urllib.request.Request(url, headers=headers, method="GET")
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
            return jsonify({"success": True, "status": status, "message": "连接成功"})

    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            return jsonify({"success": False, "message": f"认证失败 (HTTP {e.code}): API Key 无效或已过期"})
        if e.code == 404:
            return jsonify({"success": False, "message": f"接口未找到 (HTTP 404): 请检查 API URL 是否正确"})
        if e.code == 429:
            return jsonify({"success": False, "message": f"请求频率超限 (HTTP 429): API Key 有效但已达到调用限制"})
        return jsonify({"success": False, "message": f"HTTP错误 {e.code}"})
    except urllib.error.URLError as e:
        return jsonify({"success": False, "message": f"连接失败: {str(e.reason)}"})
    except Exception as e:
        log.error(f"Test connection error: {traceback.format_exc()}")
        return jsonify({"success": False, "message": f"测试失败: {str(e)}"})


@app.route('/api/config/sync-to-env', methods=['POST'])
def sync_to_env():
    global current_config
    synced_files = []

    try:
        backend_env = Path(__file__).parent.parent / ".env"
        _sync_env_file(backend_env, MAIN_ENV_MAP, "Teacher Assistant AI - Unified API Configuration")
        synced_files.append(str(backend_env))
        log.info(f"Synced config to {backend_env}")

        root_env = Path(__file__).parent.parent.parent / ".env"
        if root_env.exists() and root_env != backend_env:
            _sync_env_file(root_env, MAIN_ENV_MAP, "Teacher Assistant AI - Environment Variables")
            synced_files.append(str(root_env))
            log.info(f"Synced config to {root_env}")

        return jsonify({"success": True, "message": f"配置已同步到 {len(synced_files)} 个环境变量文件", "files": synced_files})

    except Exception as e:
        log.error(f"Sync to env failed: {e}")
        return jsonify({"success": False, "message": str(e)}), 500


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "API endpoint not found"}), 404


@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"error": "Method not allowed"}), 405


@app.errorhandler(500)
def internal_error(e):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='API Management Service')
    parser.add_argument('--host', default='0.0.0.0', help='Host to bind to')
    parser.add_argument('--port', type=int, default=5010, help='Port to listen on')
    args = parser.parse_args()

    log.info(f"Starting API Management Service on {args.host}:{args.port}")
    log.info(f"Config file: {CONFIG_FILE}")
    app.run(host=args.host, port=args.port, debug=False)
