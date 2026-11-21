; src-tauri/windows/hooks.nsh
; Prompts the user during uninstallation to decide whether to keep or delete user progress data.
!macro NSIS_HOOK_PREUNINSTALL
  MessageBox MB_YESNO|MB_ICONQUESTION \
    "Do you want to delete all Typing Trainer user profiles and progress data?$\r$\n$\r$\nClick 'No' to keep your data for future installations." \
    IDYES delete_data IDNO keep_data
  delete_data:
    SetShellVarContext current
    RMDir /r "$APPDATA\org.typingtrainer.app"
  keep_data:
!macroend
