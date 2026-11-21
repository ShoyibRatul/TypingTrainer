; src-tauri/windows/hooks.nsh
; Prompts the user during manual uninstallation to decide whether to keep or delete user progress data.
; Silently skips prompt during upgrades or auto-updates.
!macro NSIS_HOOK_PREUNINSTALL
  IfSilent skip_data_cleanup
  MessageBox MB_YESNO|MB_ICONQUESTION \
    "Do you want to delete all Typing Trainer user profiles and progress data?$\r$\n$\r$\nClick 'No' to keep your data for future installations." \
    IDYES delete_data IDNO skip_data_cleanup
  delete_data:
    SetShellVarContext current
    RMDir /r "$APPDATA\org.typingtrainer.app"
  skip_data_cleanup:
!macroend
