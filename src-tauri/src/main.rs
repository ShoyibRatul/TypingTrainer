// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod packs;

use tauri::{AppHandle, Manager};

#[tauri::command]
fn is_portable_mode() -> bool {
    if let Ok(exe_path) = std::env::current_exe() {
        if let Some(exe_dir) = exe_path.parent() {
            return exe_dir.join("portable.flag").exists();
        }
    }
    false
}

#[tauri::command]
fn get_data_root(app: AppHandle) -> Result<String, String> {
    if is_portable_mode() {
        if let Ok(exe_path) = std::env::current_exe() {
            if let Some(exe_dir) = exe_path.parent() {
                let data_dir = exe_dir.join("data");
                if !data_dir.exists() {
                    let _ = std::fs::create_dir_all(&data_dir);
                }
                return Ok(data_dir.to_string_lossy().to_string());
            }
        }
    }

    match app.path().app_data_dir() {
        Ok(path) => {
            if !path.exists() {
                let _ = std::fs::create_dir_all(&path);
            }
            Ok(path.to_string_lossy().to_string())
        }
        Err(e) => Err(e.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.unminimize();
                let _ = window.set_focus();
            }
        }))
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            packs::check_pack_security,
            packs::get_pack_limits,
            is_portable_mode,
            get_data_root
        ])
        .run(tauri::generate_context!())
        .expect("error while running Typing Trainer application");
}
