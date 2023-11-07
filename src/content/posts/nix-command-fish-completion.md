---
title: Nixコマンドのタブ補完をFish shellで有効にする
tags:
  - nix
  - fish
icon: fluent-emoji-flat:snowflake
genre: article
draft: false
publishedAt: 2023-11-07
---

## 補完を設定する

[github.com/NixOS/nix/blob/master/misc/fish/completion.fish](https://github.com/NixOS/nix/blob/master/misc/fish/completion.fish) の内容を、`~/.config/fish/completions/nix.fish`に保存する。

```sh title="~/.config/fish/completions/nix.fish"
function _nix_complete
  # Get the current command up to a cursor.
  # - Behaves correctly even with pipes and nested in commands like env.
  # - TODO: Returns the command verbatim (does not interpolate variables).
  #   That might not be optimal for arguments like -f.
  set -l nix_args (commandline --current-process --tokenize --cut-at-cursor)
  # --cut-at-cursor with --tokenize removes the current token so we need to add it separately.
  # https://github.com/fish-shell/fish-shell/issues/7375
  # Can be an empty string.
  set -l current_token (commandline --current-token --cut-at-cursor)

  # Nix wants the index of the argv item to complete but the $nix_args variable
  # also contains the program name (argv[0]) so we would need to subtract 1.
  # But the variable also misses the current token so it cancels out.
  set -l nix_arg_to_complete (count $nix_args)

  env NIX_GET_COMPLETIONS=$nix_arg_to_complete $nix_args $current_token
end

function _nix_accepts_files
  set -l response (_nix_complete)
  test $response[1] = 'filenames'
end

function _nix
  set -l response (_nix_complete)
  # Skip the first line since it handled by _nix_accepts_files.
  # Tail lines each contain a command followed by a tab character and, optionally, a description.
  # This is also the format fish expects.
  string collect -- $response[2..-1]
end

# Disable file path completion if paths do not belong in the current context.
complete --command nix --condition 'not _nix_accepts_files' --no-files

complete --command nix --arguments '(_nix)'
```

シェルを再起動すると、補完が有効になる：

```sh
❯ nix profile install nixpkgs#asdf-vm
nixpkgs#a2jmidid                                  nixpkgs#linuxPackages_xen_dom0_hardened
nixpkgs#a2ps                                      nixpkgs#linuxPackages_zen
nixpkgs#a4                                        nixpkgs#linuxptp
nixpkgs#a4term                                    nixpkgs#linuxquota
nixpkgs#a52dec                                    nixpkgs#linuxsampler
nixpkgs#aaa                                       nixpkgs#linuxstopmotion
nixpkgs#AAAAAASomeThingsFailToEvaluate            nixpkgs#linuxwave
nixpkgs#aaaaxy                                    nixpkgs#linux-doc
nixpkgs#aacgain                                   nixpkgs#linux-exploit-suggester
nixpkgs#aalib                                     nixpkgs#linux-firmware
nixpkgs#aaphoto                                   nixpkgs#linux-gpib
nixpkgs#aapt                                      nixpkgs#linux-libre
nixpkgs#aarch64-esr-decoder                       nixpkgs#linux-manual
…and 9785 more rows
```

## 参考文献

- https://github.com/kidonng/nix-completions.fish
- https://github.com/NixOS/nix/blob/master/misc/fish/completion.fish
