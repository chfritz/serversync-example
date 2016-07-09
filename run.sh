#!/bin/bash

tmux start-server
tmux new-session -d -s savidev

# Screen 0: a
tmux rename-window -t savidev:0 Master-a
tmux send-keys -t savidev:0 "cd a && meteor" C-m

# Screen 1: c
tmux new-window -t savidev:1
tmux rename-window -t savidev:1 'Slave(c)'
tmux send-keys -t savidev:1 "cd c && meteor -p 3100" C-m

tmux select-window -t savidev:0

# attach
tmux attach
