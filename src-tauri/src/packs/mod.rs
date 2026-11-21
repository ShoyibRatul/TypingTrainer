pub mod security;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct PackSummary {
    pub id: String,
    pub name: String,
    pub version: String,
    pub language: String,
    pub author: String,
    pub license: String,
}

#[tauri::command]
pub fn check_pack_security(path_str: String) -> Result<String, String> {
    security::is_safe_entry_path(&path_str)
}

#[tauri::command]
pub fn get_pack_limits() -> Result<serde_json::Value, String> {
    Ok(serde_json::json!({
        "maxCompressedBytes": security::MAX_COMPRESSED_BYTES,
        "maxUncompressedBytes": security::MAX_UNCOMPRESSED_BYTES,
        "maxEntries": security::MAX_ENTRIES,
        "maxRatio": security::MAX_RATIO,
    }))
}
