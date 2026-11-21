use std::path::Path;

pub const MAX_COMPRESSED_BYTES: u64 = 50 * 1024 * 1024; // 50 MB
pub const MAX_UNCOMPRESSED_BYTES: u64 = 200 * 1024 * 1024; // 200 MB
pub const MAX_ENTRIES: usize = 5000;
pub const MAX_RATIO: u64 = 100;

const ALLOWED_EXTENSIONS: &[&str] = &[
    "json", "txt", "md", "woff2", "ttf", "otf", "png", "webp", "svg",
];

const WINDOWS_RESERVED: &[&str] = &[
    "CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7",
    "COM8", "COM9", "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9",
];

/// Validates entry path for zip-slip, absolute pathing, and forbidden extensions.
pub fn is_safe_entry_path(path_str: &str) -> Result<String, String> {
    if path_str.trim().is_empty() {
        return Err("Empty entry path".into());
    }

    let normalized = path_str.replace('\\', "/");

    // No leading slash or Windows drive letters
    if normalized.starts_with('/') || (normalized.len() > 1 && normalized.chars().nth(1) == Some(':')) {
        return Err(format!("Absolute paths are forbidden: {}", normalized));
    }

    for segment in normalized.split('/') {
        if segment == ".." {
            return Err(format!("Path traversal '..' is forbidden: {}", normalized));
        }

        let upper = segment.to_uppercase();
        let stem = upper.split('.').next().unwrap_or("");
        if WINDOWS_RESERVED.contains(&stem) {
            return Err(format!("Reserved Windows device name: {}", segment));
        }
    }

    // Skip directories
    if !normalized.ends_with('/') {
        let p = Path::new(&normalized);
        let filename = p.file_name().and_then(|f| f.to_str()).unwrap_or("");

        if filename.eq_ignore_ascii_case("LICENSE") {
            return Ok(normalized);
        }

        let ext = p.extension().and_then(|e| e.to_str()).unwrap_or("").to_lowercase();
        if !ALLOWED_EXTENSIONS.contains(&ext.as_str()) {
            return Err(format!("Forbidden file extension '.{}' in {}", ext, normalized));
        }
    }

    Ok(normalized)
}
