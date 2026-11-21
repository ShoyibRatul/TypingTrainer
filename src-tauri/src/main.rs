// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod packs;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            packs::check_pack_security,
            packs::get_pack_limits
        ])
        .run(tauri::generate_context!())
        .expect("error while running Typing Trainer application");
}
